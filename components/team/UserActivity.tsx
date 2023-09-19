import React, { useCallback, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import ActivityDays from "./UserActivityDays";
import ActivityTimePicker from "./ActivityTimePicker";
import SubmitButton from "./SubmitButton";
import UserBreakTime from "./userBreakTime";
import { BreakTime, Treatment, User } from "@prisma/client";
import { Slots } from "types/types";

export default function UserActivity({
  user,
  setModalOpen,
  allBreakTimes,
}: {
  user: User & {
    Treatment: Treatment[];
    BreakTime: BreakTime[];
  };
  allBreakTimes: BreakTime[];
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialActivityDays = user.activityDays;
  // Use object destructuring for state variables
  const [error, setError] = useState<string>("");
  const [startActivity, setStartActivity] = useState<Dayjs>(
    dayjs(user.startActivity)
  );
  const [endActivity, setEndActivity] = useState<Dayjs>(
    dayjs(user.endActivity)
  );
  const [hasChanges, setHasChanges] = useState<boolean>(true);
  const [activityDays, setActivityDays] = useState<number[]>(
    initialActivityDays || []
  );
  const [availableSlots, setAvailableSlots] = useState<Slots[]>([]);
  const [breaks, setBreaks] = useState<BreakTime[]>(user.BreakTime);

  // Simplify slot generation logic
  const generateAvailableSlots = useCallback(() => {
    if (!startActivity || !endActivity) return;

    const slots: Slots[] = [];
    let currentSlotStart = startActivity;

    while (currentSlotStart.isBefore(endActivity)) {
      const currentSlotEnd = currentSlotStart.add(5, "minute");

      slots.push({
        start: currentSlotStart.format("HH:mm"),
        end: currentSlotEnd.format("HH:mm"),
      });
      currentSlotStart = currentSlotEnd;
    }

    setAvailableSlots(slots);
  }, [startActivity, endActivity]);

  useEffect(() => {
    generateAvailableSlots();
  }, [generateAvailableSlots]);

  return (
    <div className="flex flex-col items-center justify-evenly py-5">
      <div className="flex flex-col justify-center items-center gap-5">
        <ActivityDays
          initialActivityDays={initialActivityDays}
          activityDays={activityDays}
          setActivityDays={setActivityDays}
          setHasChanges={setHasChanges}
        />
        <ActivityTimePicker
          error={error}
          setHasChanges={setHasChanges}
          startActivity={startActivity}
          setStartActivity={setStartActivity}
          endActivity={endActivity}
          setEndActivity={setEndActivity}
          setError={setError}
        />
        <UserBreakTime
          allBreakTimes={allBreakTimes}
          userBreakTime={user.BreakTime}
          setBreaks={setBreaks}
        />
      </div>
      <br />
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="font-serif text-red-500">{error}</p>
        <SubmitButton
          user={user}
          breaks={breaks}
          startActivity={startActivity}
          endActivity={endActivity}
          hasChanges={hasChanges}
          activityDays={activityDays}
          availableSlots={availableSlots}
          setError={setError}
          setHasChanges={setHasChanges}
          setModalOpen={setModalOpen}
        />
      </div>
    </div>
  );
}

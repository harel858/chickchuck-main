import React, { useCallback, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import ActivityDays from "./UserActivityDays";
import ActivityTimePicker from "./ActivityTimePicker";
import SubmitButton from "./SubmitButton";
import { GiSandsOfTime } from "react-icons/gi";
import { User } from "@prisma/client";
import { Slots } from "types/types";

export default function UserActivity({ user }: { user: User }) {
  const [error, setError] = useState<string>("");
  const [startActivity, setStartActivity] = useState<Dayjs>(
    dayjs(user.startActivity)
  );

  const [endActivity, setEndActivity] = useState<Dayjs>(
    dayjs(user.endActivity)
  );
  const [hasChanges, setHasChanges] = useState<boolean>(true);
  const [activityDays, setActivityDays] = useState<number[]>(user.activityDays);
  const [availableSlots, setAvailableSlots] = useState<Slots[]>([]);

  const generateAvailableSlots = useCallback(
    (start: Dayjs, end: Dayjs) => {
      const slots: Slots[] = [];

      // Create slots with specified duration
      let currentSlotStart = start;
      while (currentSlotStart.isBefore(end)) {
        const currentSlotEnd = currentSlotStart.add(5, "minute");

        slots.push({
          start: currentSlotStart.format("HH:mm"),
          end: currentSlotEnd.format("HH:mm"),
        });
        currentSlotStart = currentSlotEnd;
      }
      console.log(slots);

      setAvailableSlots(slots);
    },
    [setStartActivity, setEndActivity, setActivityDays]
  );

  useEffect(() => {
    if (!startActivity || !endActivity) return;
    generateAvailableSlots(startActivity, endActivity);
  }, [startActivity, endActivity, activityDays]);

  return (
    <div className=" flex flex-col items-center justify-evenly py-5">
      <div className="flex flex-col justify-center items-center gap-5">
        <ActivityDays
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
      </div>
      <br />
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="font-serif text-red-500">{error}</p>
        <SubmitButton
          user={user}
          startActivity={startActivity}
          endActivity={endActivity}
          hasChanges={hasChanges}
          activityDays={activityDays}
          availableSlots={availableSlots}
          setError={setError}
          setHasChanges={setHasChanges}
        />
      </div>
    </div>
  );
}

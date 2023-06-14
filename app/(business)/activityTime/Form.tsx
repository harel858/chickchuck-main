"use client";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { Business, User } from "@prisma/client";
import SubmitButton from "./SubmitButton";
import ActivityDays from "./ActivityDays";
import ActivityTimePicker from "./ActivityTimePicker";
import { Slots } from "../../../types/types";

export default function Form({
  user,
}: {
  user: User & {
    Business: Business[];
  };
}) {
  const [startActivity, setStartActivity] = React.useState<Dayjs>(
    dayjs(dayjs(user.startActivity))
  );
  const [endActivity, setEndActivity] = React.useState<Dayjs>(
    dayjs(user.endActivity)
  );
  const [hasChanges, setHasChanges] = React.useState<boolean>(true);
  const [activityDays, setActivityDays] = React.useState<any[]>(
    user.Business[0].activityDays
  );
  const [availableSlots, setAvailableSlots] = React.useState<Slots[]>([]);

  React.useEffect(() => {
    generateAvailableSlots(startActivity, endActivity);

    setHasChanges(false);
  }, [startActivity, setStartActivity, endActivity, setEndActivity]);

  // This function will generate a list of available slots based on the start and end time of the activity
  const generateAvailableSlots = (start: Dayjs, end: Dayjs) => {
    const slots: Slots[] = [];
    console.log(start);

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
  };

  return (
    <div className="flex flex-col items-center justify-center relative w-fit bg-orange-300 p-5 rounded-2xl gap-5">
      <h2 className="text-black text-2xl">Bussiness Activity</h2>
      <ActivityDays
        activityDays={activityDays}
        setActivityDays={setActivityDays}
        setHasChanges={setHasChanges}
      />
      <ActivityTimePicker
        startActivity={startActivity}
        setStartActivity={setStartActivity}
        endActivity={endActivity}
        setEndActivity={setEndActivity}
      />

      <SubmitButton
        user={user}
        startActivity={startActivity}
        endActivity={endActivity}
        hasChanges={hasChanges}
        setHasChanges={setHasChanges}
        activityDays={activityDays}
        availableSlots={availableSlots}
      />
    </div>
  );
}

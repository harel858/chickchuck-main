"use client";
import * as React from "react";
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
    dayjs(user.Business[0].openingTime)
  );
  const [endActivity, setEndActivity] = React.useState<Dayjs>(
    dayjs(user.Business[0].closingTime)
  );
  const [duration, setDuration] = React.useState<number>(5);
  const [hasChanges, setHasChanges] = React.useState<boolean>(true);
  const [activityDays, setActivityDays] = React.useState<any[]>(
    user.Business[0].activityDays
  );
  const [availableSlots, setAvailableSlots] = React.useState<Slots[]>([]);

  React.useEffect(() => {
    generateAvailableSlots(startActivity, endActivity, duration);

    setHasChanges(false);
  }, [startActivity, setStartActivity, endActivity, setEndActivity, duration]);

  // This function will generate a list of available slots based on the start and end time of the activity
  const generateAvailableSlots = (
    start: Dayjs,
    end: Dayjs,
    duration: number
  ) => {
    const slots: Slots[] = [];
    console.log(startActivity.startOf("day").hour());

    // Create slots with specified duration
    let currentSlotStart = start;
    while (currentSlotStart.isBefore(end)) {
      const currentSlotEnd = currentSlotStart.add(duration, "minute");
      console.log(currentSlotStart.format("HH:mm"));

      slots.push({
        start: currentSlotStart.format("HH:mm"),
        end: currentSlotEnd.format("HH:mm"),
      });
      currentSlotStart = currentSlotEnd;
    }
    console.log(slots);

    setAvailableSlots(slots);
  };

  const handleSlotDurationChange = (duration: any) => {
    // Handle selected duration here
    setDuration(duration);
    generateAvailableSlots(startActivity, endActivity, duration);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full relative">
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
        duration={duration}
      />
    </div>
  );
}

"use client";
import * as React from "react";
/* import "./style.css"; */
import dayjs, { Dayjs } from "dayjs";
import { User } from "@prisma/client";
import SlotDurationPicker from "./SlotDurationPicker";
import SubmitButton from "./SubmitButton";
import ActivityDays from "./ActivityDays";
import { AvailableSlot } from "../../../types";
import ActivityTimePicker from "./ActivityTimePicker";

export default function Form({ user }: { user: User }) {
  const [startActivity, setStartActivity] = React.useState<Dayjs>(
    dayjs("2022-04-07T09:00:00")
  );
  const [endActivity, setEndActivity] = React.useState<Dayjs>(
    dayjs("2022-04-07T17:00:00")
  );
  const [duration, setDuration] = React.useState<number>(45);
  const [hasChanges, setHasChanges] = React.useState<boolean>(true);
  const [activityDays, setActivityDays] = React.useState<any[]>(
    user.activityDays
  );
  const [availableSlots, setAvailableSlots] = React.useState<AvailableSlot[]>(
    []
  );

  // This function will generate a list of available slots based on the start and end time of the activity
  const generateAvailableSlots = (
    start: Dayjs,
    end: Dayjs,
    duration: number
  ) => {
    const slots: AvailableSlot[] = [];

    // Create slots with specified duration
    let currentSlotStart = start;
    while (currentSlotStart.isBefore(end)) {
      const currentSlotEnd = currentSlotStart.add(duration, "minute");
      slots.push({
        id: `${currentSlotStart.hour()}-${currentSlotEnd.hour()}`,
        start: currentSlotStart,
        end: currentSlotEnd,
      });
      currentSlotStart = currentSlotEnd;
    }
    console.log(slots);

    setAvailableSlots(slots);
  };

  React.useEffect(() => {
    if (
      startActivity.format() != user.startActivity ||
      endActivity.format() != user.endActivity
    ) {
      generateAvailableSlots(startActivity, endActivity, duration);
    }

    setHasChanges(false);
  }, [startActivity, setStartActivity, endActivity, setEndActivity, duration]);

  const handleSlotDurationChange = (duration: any) => {
    // Handle selected duration here
    setDuration(duration);
    generateAvailableSlots(startActivity, endActivity, duration);
  };

  return (
    <>
      <ActivityDays
        activityDays={activityDays}
        setActivityDays={setActivityDays}
        setHasChanges={setHasChanges}
      />
      <SlotDurationPicker onChange={handleSlotDurationChange} />
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
    </>
  );
}

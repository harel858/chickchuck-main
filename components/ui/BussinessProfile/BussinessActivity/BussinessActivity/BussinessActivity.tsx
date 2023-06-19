"use client";
import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ProfilePageData, Slots } from "../../../../../types/types";
import ActivityDays from "./ActivityDays";
import ActivityTimePicker from "./ActivityTimePicker";
import SubmitButton from "./SubmitButton";
import { SelectChangeEvent } from "@mui/material/Select";

export default function BussinessActivity({ user }: { user: ProfilePageData }) {
  const [error, setError] = useState<string>("");
  const [startActivity, setStartActivity] = useState<Dayjs>(
    dayjs(dayjs(user.startActivity))
  );
  const [endActivity, setEndActivity] = useState<Dayjs>(
    dayjs(user.endActivity)
  );
  const [hasChanges, setHasChanges] = useState<boolean>(true);
  const [activityDays, setActivityDays] = useState<any[]>(
    user.business.activityDays
  );
  const [availableSlots, setAvailableSlots] = useState<Slots[]>([]);

  useEffect(() => {
    // Skip the first render
    let skipFirstRender = true;

    if (skipFirstRender) {
      skipFirstRender = false;
      return;
    }
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
    <div className="flex flex-col items-center justify-center relative max-2xl:w-11/12 w-52 bg-white/70 shadow-md shadow-black p-5 rounded-2xl gap-2">
      <h2 className="text-black text-2xl text-center w-max">
        Bussiness Activity
      </h2>
      <ActivityDays
        activityDays={activityDays}
        setActivityDays={setActivityDays}
        setHasChanges={setHasChanges}
      />
      <ActivityTimePicker
        setHasChanges={setHasChanges}
        startActivity={startActivity}
        setStartActivity={setStartActivity}
        endActivity={endActivity}
        setEndActivity={setEndActivity}
        setError={setError}
      />
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
        />
      </div>
    </div>
  );
}

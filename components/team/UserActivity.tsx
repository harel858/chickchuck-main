"use client";
import React, { useEffect, useState, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import { BiTime } from "react-icons/bi";
import UserActivityDays from "./UserActivityDays";
import UserActivityTime from "./UserActivityTime";
import SubmitButton from "./SubmitButton";
import { ProfilePageData, Slots } from "types/types";

export default function BusinessActivity({ user }: { user: ProfilePageData }) {
  const [error, setError] = useState<string>("");
  const [startActivity, setStartActivity] = useState<Dayjs>(
    dayjs(user.startActivity)
  );

  const [endActivity, setEndActivity] = useState<Dayjs>(
    dayjs(user.endActivity)
  );
  const [hasChanges, setHasChanges] = useState<boolean>(true);
  const [activityDays, setActivityDays] = useState<number[]>(
    user.business.activityDays
  );
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
    <div className="mt-40 flex flex-col items-center justify-end relative max-2xl:w-11/12 w-64 dark:bg-orange-400/70 bg-slate-900 shadow-sm shadow-black p-5 rounded-xl gap-3 transition-all duration-300 ease-in-out border border-gray-500">
      <div className="text-white/90 flex justify-center items-center gap-2">
        <h2 className="text-2xl font-bold text-center w-max">
          Business Activity
        </h2>
        <BiTime className="text-3xl font-semibold" />
      </div>

      <UserActivityDays
        activityDays={activityDays}
        setActivityDays={setActivityDays}
        setHasChanges={setHasChanges}
      />
      <UserActivityTime
        error={error}
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
          setHasChanges={setHasChanges}
        />
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ProfilePageData, Slots } from "../../../../../types/types";
import ActivityDays from "./ActivityDays";
import ActivityTimePicker from "./ActivityTimePicker";
import SubmitButton from "./SubmitButton";
import { BiTime } from "react-icons/bi";
import { Skeleton } from "antd";

export default function BussinessActivity({ user }: { user: ProfilePageData }) {
  const [error, setError] = useState<string>("");
  const [startActivity, setStartActivity] = useState<Dayjs>(
    dayjs(dayjs(user.startActivity))
  );
  const [endActivity, setEndActivity] = useState<Dayjs>(
    dayjs(user.endActivity)
  );
  const [hasChanges, setHasChanges] = useState<boolean>(true);
  const [activityDays, setActivityDays] = useState<number[]>(
    user.business.activityDays
  );
  const [availableSlots, setAvailableSlots] = useState<Slots[]>([]);
  const isInitialRender = useRef(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isInitialRender.current) {
      setLoading(false);
      isInitialRender.current = false;
      return;
    }

    generateAvailableSlots(startActivity, endActivity);
  }, [startActivity, setStartActivity, endActivity, setEndActivity]);

  // This function will generate a list of available slots based on the start and end time of the activity
  const generateAvailableSlots = (start: Dayjs, end: Dayjs) => {
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

    setAvailableSlots(slots);
  };

  return (
    <div className="flex flex-col items-center justify-end relative max-2xl:w-11/12 w-64 dark:bg-orange-400/70 bg-slate-900 shadow-sm shadow-black p-5 rounded-xl gap-3 transition-all duration-300 ease-in-out border border-gray-500">
      <div className="text-white/90 flex justify-center items-center gap-3">
        <h2 className=" text-2xl font-semibold text-center w-max">
          Business Activity
        </h2>
        <BiTime className="text-3xl font-semibold" />
      </div>

      {loading ? (
        <Skeleton active />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

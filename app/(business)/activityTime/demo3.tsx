"use client";
import * as React from "react";
/* import "./style.css"; */
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { User } from "@prisma/client";
import SlotDurationPicker from "./SlotDurationPicker";
import SubmitButton from "./SubmitButton";
import Demo2 from "./demo2";
import { AvailableSlot } from "../../../types";

export default function Demo3({ user }: { user: User }) {
  const [startActivity, setStartActivity] = React.useState<Dayjs>(
    dayjs("2022-04-07T09:00:00")
  );
  const [endActivity, setEndActivity] = React.useState<Dayjs>(
    dayjs("2022-04-07T17:00:00")
  );
  const [duration, setDuration] = React.useState<number>(45);
  const [hasChanges, setHasChanges] = React.useState<boolean>(true);
  const [activityDays, setActivityDays] = React.useState<any[]>([]);
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
      <Demo2
        activityDays={activityDays}
        setActivityDays={setActivityDays}
        setHasChanges={setHasChanges}
      />
      <SlotDurationPicker onChange={handleSlotDurationChange} />{" "}
      <div className="md:w-max flex flex-col justify-center gap-12  rounded-2xl bg-white/[0.8]">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticTimePicker
            displayStaticWrapperAs="mobile"
            value={startActivity}
            onChange={(newValue) => {
              newValue && setStartActivity(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Start Activity" />
            )}
          />
          <StaticTimePicker
            displayStaticWrapperAs="mobile"
            value={endActivity}
            onChange={(newValue) => {
              newValue && setEndActivity(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="End Activity"
                className="w-full md:w-auto"
              />
            )}
          />
        </LocalizationProvider>
      </div>
      <SubmitButton
        user={user}
        hasChanges={hasChanges}
        setHasChanges={setHasChanges}
        activityDays={activityDays}
        availableSlots={availableSlots}
      />
    </>
  );
}

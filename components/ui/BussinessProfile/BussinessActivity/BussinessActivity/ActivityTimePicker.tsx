import React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers";

type ActivityTimePickerProps = {
  startActivity: Dayjs;
  setStartActivity: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  endActivity: Dayjs;
  setEndActivity: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
};
function ActivityTimePicker({
  startActivity,
  setStartActivity,
  endActivity,
  setEndActivity,
  setError,
  setHasChanges,
}: ActivityTimePickerProps) {
  return (
    <div className="rounded-full flex flex-col gap-2">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
          label="Start"
          orientation="landscape"
          views={["hours", "minutes"]}
          value={startActivity}
          onChange={(newValue) => {
            if (newValue && newValue?.hour() < endActivity.hour()) {
              setStartActivity(newValue);
              setHasChanges(false);
            } else {
              setError("Activity time Is Not Valid");
              setHasChanges(true);
            }
          }}
        />
        <MobileTimePicker
          label="End"
          orientation="landscape"
          value={endActivity}
          onChange={(newValue) => {
            if (newValue && newValue?.hour() > startActivity.hour()) {
              setEndActivity(newValue);
              setHasChanges(false);
            } else {
              setError("Activity time Is Not Valid");
              setHasChanges(true);
            }
          }}
        />
      </LocalizationProvider>
    </div>
  );
}

export default ActivityTimePicker;

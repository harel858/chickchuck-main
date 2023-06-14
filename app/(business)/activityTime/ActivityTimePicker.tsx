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
};
function ActivityTimePicker({
  startActivity,
  setStartActivity,
  endActivity,
  setEndActivity,
}: ActivityTimePickerProps) {
  return (
    <div className="rounded-full flex flex-col gap-2">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
          label="Start"
          orientation="portrait"
          views={["hours", "minutes"]}
          value={startActivity}
          onChange={(newValue) => {
            newValue && setStartActivity(newValue);
          }}
        />
        <MobileTimePicker
          label="End"
          orientation="portrait"
          value={endActivity}
          onChange={(newValue) => {
            newValue && setEndActivity(newValue);
          }}
        />
      </LocalizationProvider>
    </div>
  );
}

export default ActivityTimePicker;

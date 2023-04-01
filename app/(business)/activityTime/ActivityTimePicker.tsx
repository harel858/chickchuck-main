import React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";

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
    <div className="rounded-full ">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticTimePicker
          className="rounded-3xl  border-2 border-gray-900  bg-white/10 p-10"
          displayStaticWrapperAs="mobile"
          value={startActivity}
          onChange={(newValue) => {
            newValue && setStartActivity(newValue);
          }}
        />
        <StaticTimePicker
          displayStaticWrapperAs="mobile"
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

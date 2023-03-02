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
    <div>
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
            <TextField {...params} label="End Activity" />
          )}
        />
      </LocalizationProvider>
    </div>
  );
}

export default ActivityTimePicker;

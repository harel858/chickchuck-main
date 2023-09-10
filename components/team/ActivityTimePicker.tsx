import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.extend(customParseFormat);

type ActivityTimePickerProps = {
  startActivity: Dayjs;
  setStartActivity: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  endActivity: Dayjs;
  setEndActivity: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
};

function ActivityTimePicker({
  error,
  startActivity,
  setStartActivity,
  endActivity,
  setEndActivity,
  setError,
  setHasChanges,
}: ActivityTimePickerProps) {
  const format = "HH:mm";
  console.log("dayjs(startActivity)", dayjs(startActivity).format(format));
  console.log("dayjs(endActivity)", dayjs(endActivity).format(format));
  const totalSlots = endActivity.diff(startActivity, "minute") / 5;
  console.log("totalSlots", totalSlots);

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col justify-center items-center gap-2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex flex-row justify-center items-baseline">
            <TimePicker
              label={<p className="text-xl font-serif">Opening</p>}
              defaultValue={startActivity ? dayjs(startActivity) : undefined}
              onChange={(newValue) => {
                if (
                  !newValue ||
                  (endActivity && newValue.hour() >= endActivity.hour())
                ) {
                  setError("Activity time is not valid");
                  setHasChanges(true);
                  return;
                }
                setStartActivity(newValue);
                setError("");
                setHasChanges(false);
              }}
              sx={{
                width: "100%",
                borderRadius: "4px",
                ":after": { border: "4px solid white" },
                ...(error && { boxShadow: "0px 0px 0px 2px red" }),
              }}
              className="w-max"
            />
          </div>
          <div className="flex flex-row justify-center items-baseline">
            <TimePicker
              label={<p className="text-xl font-serif">Closing</p>}
              defaultValue={endActivity ? dayjs(endActivity) : undefined}
              onChange={(newValue) => {
                if (
                  !newValue ||
                  (startActivity && startActivity.hour() >= newValue.hour())
                ) {
                  setError("Activity time is not valid");
                  setHasChanges(true);
                  return;
                }
                setEndActivity(newValue);
                setError("");
                setHasChanges(false);
              }}
              className="w-max"
            />
          </div>
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default ActivityTimePicker;

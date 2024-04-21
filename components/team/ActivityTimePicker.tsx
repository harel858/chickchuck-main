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
  bussinesOpeningTime: number;
  bussinesClosingTime: number;
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
  bussinesClosingTime,
  bussinesOpeningTime,
}: ActivityTimePickerProps) {
  const format = "HH:mm";

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col justify-center items-center gap-2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex flex-row justify-center items-baseline">
            <TimePicker
              label={<p className="text-xl font-serif">Opening</p>}
              defaultValue={startActivity ? dayjs(startActivity) : undefined}
              onChange={(newValue) => {
                console.log("bussinesOpeningTime", bussinesOpeningTime);
                console.log(" newValue.hour() ", newValue);
                if (
                  !newValue ||
                  (endActivity && newValue.hour() >= endActivity.hour()) ||
                  newValue.hour() < bussinesOpeningTime
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
                  (startActivity && startActivity.hour() >= newValue.hour()) ||
                  newValue.hour() > bussinesClosingTime
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

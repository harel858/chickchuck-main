import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
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
  const format = "HH:mm A";
  console.log("dayjs(startActivity)", dayjs(startActivity).format(format));
  console.log("dayjs(endActivity)", dayjs(endActivity).format(format));
  const totalSlots = endActivity.diff(startActivity, "minute") / 5;
  console.log("totalSlots", totalSlots);

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <h5 className="text-black font-semibold text-xl">Activity Time</h5>
      <div className="flex flex-row justify-center items-center gap-2">
        <div className="flex justify-center items-baseline gap-2">
          <p className="text-black font-normal text-md">Start </p>
          <TimePicker
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
            format={format}
          />
        </div>
        <div className="flex justify-center items-baseline gap-2">
          <p className="text-black font-normal text-md">End </p>
          <TimePicker
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
            format={format}
          />
        </div>
      </div>
    </div>
  );
}

export default ActivityTimePicker;

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
      <TimePicker.RangePicker
        onChange={(e) => {
          if (
            Array.isArray(e) &&
            e[0]?.hour() &&
            e[1]?.hour() &&
            e[0]?.hour() < e[1]?.hour()
          ) {
            setStartActivity(e[0]);
            setEndActivity(e[1]);
            setError("");
            setHasChanges(false);
          } else {
            setError("Activity time Is Not Valid");
            setHasChanges(true);
          }
        }}
        status="warning"
      />
    </div>
  );
}

export default ActivityTimePicker;

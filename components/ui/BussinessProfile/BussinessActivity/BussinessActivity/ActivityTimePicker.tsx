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
      <TimePicker
        onChange={(newValue) => {
          {
            if (newValue && newValue?.hour() < endActivity.hour()) {
              setStartActivity(newValue);
              setHasChanges(false);
            } else {
              setError("Activity time Is Not Valid");
              setHasChanges(true);
            }
          }
        }}
      />
      <TimePicker
        onChange={(value) => {
          if (!value) console.log("null");

          if (value && value?.hour() > startActivity.hour()) {
            setEndActivity(value);
            setHasChanges(false);
          } else {
            setError("Activity time Is Not Valid");
            setHasChanges(true);
          }
        }}
        format={"HH:mm A"}
        minuteStep={5}
      />
    </div>
  );
}

export default ActivityTimePicker;

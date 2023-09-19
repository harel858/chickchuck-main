"use client";
import React from "react";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import { ActivityDay } from "types/types";
import { Select, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

const options: ActivityDay[] = [
  { value: 0, label: "Sunday", color: "blue" },
  { value: 1, label: "Monday", color: "purple" },
  { value: 2, label: "Tuesday", color: "yellow" },
  { value: 3, label: "Wednesday", color: "red" },
  { value: 4, label: "Thursday", color: "pink" },
  { value: 5, label: "Friday", color: "green" },
  { value: 6, label: "Saturday", color: "cyan" },
];
const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={options[value]?.color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3, fontSize: "1.2em" }}
    >
      {label}
    </Tag>
  );
};
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ActivityDays = ({
  activityDays,
  setActivityDays,
  setHasChanges,
  initialActivityDays,
}: {
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  activityDays: number[];
  initialActivityDays: number[];
  setActivityDays: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const activityDaysAsObjects = activityDays.map((dayValue) => {
    const dayObject = options.find((option) => option.value === dayValue);
    return dayObject ? dayObject : { value: dayValue, label: "" };
  });
  const handleSelectChange = (selectedValues: number[]) => {
    const selectedDays: number[] = [];
    for (let i = 0; i < options.length; i++) {
      const value = options[i]?.value;
      console.log("value", value);

      if (value && selectedValues.includes(value)) selectedDays.push(value);
    }

    const activityDaysChanged =
      JSON.stringify(activityDays.sort()) !==
      JSON.stringify(initialActivityDays.sort());
    !activityDaysChanged ? setHasChanges(false) : setHasChanges(true);

    setActivityDays(selectedDays);
  };

  return (
    <Select
      mode="multiple"
      tagRender={tagRender}
      defaultValue={activityDaysAsObjects.map((item) => item.value)}
      style={{ width: "100%" }}
      options={options}
      onChange={(e: number[]) => handleSelectChange(e)}
    />
  );
};

export default ActivityDays;

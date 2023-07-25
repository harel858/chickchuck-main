"use client";
import React from "react";
import { Select, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { ActivityDay } from "../../../../../types/types";

const options: ActivityDay[] = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const shortenedLabel = JSON.stringify(label).substring(0, 4); // Extract the first three characters

  return (
    <Tag
      color={"blue"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      className="text-base"
    >
      {shortenedLabel}
    </Tag>
  );
};

const ActivityDays = ({
  activityDays,
  setActivityDays,
  setHasChanges,
}: {
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  activityDays: number[];
  setActivityDays: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const handleSelectChange = (selectedValues: number[]) => {
    const selectedDays: number[] = [];
    for (let i = 0; i < options.length; i++) {
      const value = options[i]?.value;
      if (selectedValues.includes(value)) selectedDays.push(value);
    }

    setActivityDays(selectedDays);
    setHasChanges(false);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <h5 className="text-white/90 font-semibold text-xl">Activity Days</h5>
      <Select
        mode="multiple"
        showArrow
        size="large"
        tagRender={tagRender}
        defaultValue={[...activityDays]}
        style={{
          color: "black",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "1em",
          alignItems: "center",
          overflowY: "hidden", // Hide the scrollbar
        }}
        onChange={handleSelectChange}
        options={options}
      />
    </div>
  );
};

export default ActivityDays;

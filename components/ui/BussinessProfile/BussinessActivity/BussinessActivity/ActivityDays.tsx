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
  return (
    <Tag
      color={"default"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      className="text-base"
    >
      {label}
    </Tag>
  );
};

const ActivityDays = ({
  activityDays,
  setActivityDays,
  setHasChanges,
}: {
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  activityDays: any[];
  setActivityDays: React.Dispatch<React.SetStateAction<ActivityDay[]>>;
}) => {
  console.log(activityDays);

  return (
    <Select
      mode="multiple"
      showArrow
      tagRender={tagRender}
      defaultValue={[...activityDays]}
      style={{
        width: "100%",
        height: "5em",
        display: "flex",
        gap: "2em",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "scroll",
      }}
      options={options}
    />
  );
};

export default ActivityDays;

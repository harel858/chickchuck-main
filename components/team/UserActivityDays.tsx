"use client";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TbCalendarTime } from "react-icons/tb";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import TextField from "@mui/material/TextField";
import { Chip } from "@mui/material";
import { ActivityDay } from "types/types";
import { InputAdornment } from "@mui/material";

const options: ActivityDay[] = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ActivityDays = ({
  activityDays,
  setActivityDays,
  setHasChanges,
}: {
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  activityDays: number[];
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
      if (selectedValues.includes(value)) selectedDays.push(value);
    }

    setActivityDays(selectedDays);
    setHasChanges(false);
  };
  return (
    <div className="flex flex-col justify-center items-baseline">
      <Autocomplete
        sx={{ width: 300 }}
        multiple
        id="checkboxes-tags-demo"
        value={activityDaysAsObjects}
        options={options}
        disableCloseOnSelect
        size="medium"
        getOptionLabel={(option) => option.label}
        onChange={(event, value) =>
          handleSelectChange(value.map((option) => option.value))
        }
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option.value}>
            <Checkbox
              key={option.value}
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.label}
          </li>
        )}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option.value}
              label={option.label}
            />
          ));
        }}
        renderInput={(params) => (
          <TextField
            key={params.id}
            {...params}
            variant="standard"
            placeholder="Activity Days"
          />
        )}
      />
    </div>
  );
};

export default ActivityDays;

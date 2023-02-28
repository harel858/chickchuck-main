"use client";
import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const days = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

export default function Demo2({
  setHasChanges,
  activityDays,
  setActivityDays,
}: {
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  activityDays: any[];
  setActivityDays: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const handleChange = (event: SelectChangeEvent<typeof activityDays>) => {
    const {
      target: { value },
    } = event;
    console.log(value);

    setActivityDays(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setHasChanges(false);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={activityDays}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {days.map((day, i) => (
            <MenuItem key={day.value} value={day.value}>
              <Checkbox checked={activityDays.includes(day.value)} />
              <ListItemText primary={day.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

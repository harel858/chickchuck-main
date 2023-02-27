"use client";
import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { User } from "@prisma/client";

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

const names = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
console.log(new Date().getDay());

export default function Demo2({ user }: { user: User }) {
  const [workingDays, setWorkingDays] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof workingDays>) => {
    const {
      target: { value },
    } = event;
    let newVal = value as string[];

    setWorkingDays(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    const activityDays = newVal.map((day) => names.indexOf(day));
    // activityDays now contains an array of integers representing the selected days
    console.log(activityDays);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={workingDays}
          onChange={handleChange}
          input={<OutlinedInput label="Working Days" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((name, i) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={user.activityDays.includes(i)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

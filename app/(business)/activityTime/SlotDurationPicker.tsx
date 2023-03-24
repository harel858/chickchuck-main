"use client";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
const durations = [5, 15, 30, 45];

export default function SlotDurationPicker({
  onChange,
  duration,
}: {
  onChange: any;
  duration: number;
}) {
  return (
    <Select value={duration} onChange={(e) => onChange(e.target.value)}>
      {durations.map((duration) => (
        <MenuItem key={duration} value={duration}>
          {duration} minutes
        </MenuItem>
      ))}
    </Select>
  );
}

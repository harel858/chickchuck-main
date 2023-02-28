"use client";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const durations = [15, 30, 45];

export default function SlotDurationPicker({ onChange }: { onChange: any }) {
  const [duration, setDuration] = useState(durations[0]);

  const handleDurationChange = (event: SelectChangeEvent<any>) => {
    const selectedDuration = parseInt(event.target.value);
    setDuration(selectedDuration);
    onChange(selectedDuration);
  };

  return (
    <Select value={duration} onChange={handleDurationChange}>
      {durations.map((duration) => (
        <MenuItem key={duration} value={duration}>
          {duration} minutes
        </MenuItem>
      ))}
    </Select>
  );
}

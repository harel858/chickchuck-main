import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleViewMode({
  setViewMode,
  viewMode,
  setSearchQuery,
}: {
  setViewMode: React.Dispatch<React.SetStateAction<"daily" | "weekly">>;
  viewMode: "weekly" | "daily";
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "daily" | "weekly"
  ) => {
    setViewMode(newAlignment);
    setSearchQuery("");
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={viewMode}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="weekly">Weekly</ToggleButton>
      <ToggleButton value="daily">Daily</ToggleButton>
    </ToggleButtonGroup>
  );
}

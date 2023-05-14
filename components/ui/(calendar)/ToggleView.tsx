import * as React from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { CalendarPickerSkeleton } from "@mui/lab";
import { Calendar } from "lucide-react";

export default function ToggleView({
  currentView,
  setCurrentView,
}: {
  currentView: "list" | "calendar";
  setCurrentView: React.Dispatch<React.SetStateAction<"list" | "calendar">>;
}) {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: "list" | "calendar"
  ) => {
    console.log(nextView);

    setCurrentView(nextView);
  };

  return (
    <ToggleButtonGroup
      orientation="horizontal"
      value={currentView}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="list" aria-label="list">
        <ViewListIcon />
      </ToggleButton>
      <ToggleButton value="calendar" aria-label="calendar">
        <Calendar />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

"use client";
import React from "react";
import AppointmentList from "./AppointmentList";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AppointmentEvent } from "../../../../../types";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
dayjs.extend(customParseFormat);

function CalendarComponent({ events }: { events: AppointmentEvent[] }) {
  const [value, setValue] = React.useState(() => dayjs());
  const [selectedValue, setSelectedValue] = React.useState(() => dayjs());
  const [eventsByDate, setEventsByDate] = React.useState<AppointmentEvent[]>(
    []
  );
  React.useEffect(() => {
    const value: AppointmentEvent[] = [];

    events.map((event, i) => {
      if (event.date === selectedValue.format("DD/MM/YYYY")) value.push(event);
      return;
    });
    console.log(value);
    setEventsByDate(value);
  }, [value, selectedValue]);

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  return (
    <div className="flex justify-center h-full">
      <div className="flex justify-center flex-grow content-center h-full rounded-3xl w-9/12">
        <AppointmentList
          value={value}
          onSelect={onSelect}
          selectedValue={selectedValue}
          eventsByDate={eventsByDate}
        />
      </div>
    </div>
  );
}

export default CalendarComponent;

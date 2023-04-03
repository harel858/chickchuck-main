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
    <div className="flex justify-center items-stretch content-center border border-gray-800 pb-20  rounded-3xl w-9/12">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={value}
          onChange={(e) => e && onSelect(e)}
          className="bg-white/70 rounded-tl-3xl rounded-br-3xl  rounded-bl-3xl"
          defaultValue={dayjs()}
        />
      </LocalizationProvider>

      <AppointmentList
        onSelect={onSelect}
        selectedValue={selectedValue}
        eventsByDate={eventsByDate}
      />
    </div>
  );
}

export default CalendarComponent;

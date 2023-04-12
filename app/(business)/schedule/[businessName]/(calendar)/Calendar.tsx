"use client";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AppointmentEvent } from "../../../../../types";
import MemoizedAppointmentList from "./AppointmentList";
dayjs.extend(customParseFormat);

function CalendarComponent({ events }: { events: AppointmentEvent[] }) {
  const [value, setValue] = React.useState(() => dayjs());
  const [selectedValue, setSelectedValue] = React.useState(() => dayjs());
  const [eventsByDate, setEventsByDate] = React.useState<AppointmentEvent[]>(
    []
  );
  React.useMemo(() => {
    const filteredEvents: AppointmentEvent[] = events.filter(
      (event) => event.date === selectedValue.format("DD/MM/YYYY")
    );

    const sortedEvents = filteredEvents.slice().sort((a, b) => {
      const startTimeA = dayjs(a.start).valueOf();
      const startTimeB = dayjs(b.start).valueOf();
      return startTimeA - startTimeB;
    });

    setEventsByDate(sortedEvents);
  }, [selectedValue, events]);

  const onSelect = React.useCallback((newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  }, []);

  return (
    <div className="flex justify-center h-full">
      <div className="flex justify-center flex-grow content-center h-max rounded-3xl w-9/12">
        <MemoizedAppointmentList
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

"use client";
import classes from "./style.module.css";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AppointmentEvent, ScheduleProps } from "../../../types/types";
import MemoizedAppointmentList from "./AppointmentList";
import ListNav from "./ListNav";
import CalendarPagination from "./CalendarPagination";
dayjs.extend(customParseFormat);

function CalendarComponent({
  scheduleProps,
}: {
  scheduleProps: ScheduleProps;
}) {
  const [value, setValue] = React.useState(() => dayjs());
  const [selectedValue, setSelectedValue] = React.useState(() => dayjs());
  const [eventsByDate, setEventsByDate] = React.useState<AppointmentEvent[]>(
    []
  );

  React.useMemo(() => {
    let filteredEvents: AppointmentEvent[] = [];

    scheduleProps.scheduleData.forEach((item) => {
      const result: AppointmentEvent[] = item.events.filter(
        (event) => event.date === selectedValue.format("DD/MM/YYYY")
      );
      filteredEvents.push(...result);
    });

    const sortedEvents = filteredEvents.slice().sort((a, b) => {
      const startTimeA = dayjs(a.start).valueOf();
      const startTimeB = dayjs(b.start).valueOf();
      return startTimeA - startTimeB;
    });

    setEventsByDate(sortedEvents);
  }, [selectedValue, scheduleProps]);

  const onSelect = React.useCallback((newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  }, []);

  return (
    <div className="flex justify-center h-full">
      <div className="flex flex-col gap-5 justify-center flex-grow content-center h-max rounded-3xl w-9/12">
        <CalendarPagination scheduleProps={scheduleProps} />
        <div
          className={`flex-1 bg-white/40 rounded-3xl ${classes.openSans} overflow-hidden max-h-full shadow-2xl shadow-black/50 dark:shadow-white/10 p-0`}
        >
          <ListNav
            scheduleProps={scheduleProps}
            selectedValue={selectedValue}
            onSelect={onSelect}
          />
          <MemoizedAppointmentList
            value={value}
            onSelect={onSelect}
            eventsByDate={eventsByDate}
          />
        </div>
      </div>
    </div>
  );
}

export default CalendarComponent;

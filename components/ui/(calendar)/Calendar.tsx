"use client";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AppointmentEvent, ScheduleProps } from "../../../types/types";
import MemoizedAppointmentList from "./AppointmentList";
import ListNav from "./ListNav";
import { motion } from "framer-motion";

import SlotCalendar from "./SlotCalendar";
dayjs.extend(customParseFormat);

export default function CalendarComponent({
  scheduleProps,
}: {
  scheduleProps: ScheduleProps;
}) {
  const [calendar, setCalendar] = React.useState(scheduleProps.user.id);
  const [value, setValue] = React.useState(() => dayjs());
  const [selectedValue, setSelectedValue] = React.useState(() => dayjs());
  const [eventsByDate, setEventsByDate] = React.useState<AppointmentEvent[]>(
    []
  );
  const [currentView, setCurrentView] = React.useState<"list" | "calendar">(
    "list"
  );
  console.log(scheduleProps);
  React.useMemo(() => {
    let filteredEvents: AppointmentEvent[] = [];

    scheduleProps.scheduleData.forEach((item) => {
      const result: AppointmentEvent[] = item.events.filter((event) => {
        if (currentView === "list") {
          return event.date === selectedValue.format("DD/MM/YYYY");
        } else if (currentView === "calendar") {
          // Filter events for the current week
          const startOfWeek = selectedValue.startOf("week");
          const endOfWeek = selectedValue.endOf("week");
          const eventDate = dayjs(event.date, "DD/MM/YYYY");
          return (
            (eventDate.isAfter(startOfWeek) && eventDate.isBefore(endOfWeek)) ||
            eventDate.isSame(startOfWeek) ||
            eventDate.isSame(endOfWeek)
          );
        }
        return false;
      });
      filteredEvents.push(...result);
    });

    const sortedEvents = filteredEvents.slice().sort((a, b) => {
      const startTimeA = dayjs(a.start).valueOf();
      const startTimeB = dayjs(b.start).valueOf();
      return startTimeA - startTimeB;
    });

    setEventsByDate(sortedEvents);
  }, [selectedValue, scheduleProps, currentView]);

  const onSelect = React.useCallback(
    (newValue: Dayjs) => {
      setValue(newValue);
      setSelectedValue(newValue);
    },
    [currentView]
  );

  return (
    <div className="flex justify-center max-h-full">
      <div className="flex flex-col gap-5 justify-center max-h-full flex-grow content-center rounded-3xl w-9/12">
        <div
          className={`flex-1 bg-white/40 rounded-3xl max-h-full shadow-2xl shadow-black/50 dark:shadow-white/10 p-0`}
        >
          {currentView === "list" ? (
            <React.Fragment>
              <ListNav
                scheduleProps={scheduleProps}
                selectedValue={selectedValue}
                setCurrentView={setCurrentView}
                currentView={currentView}
                onSelect={onSelect}
              />
              <MemoizedAppointmentList
                value={value}
                onSelect={onSelect}
                eventsByDate={eventsByDate}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ListNav
                scheduleProps={scheduleProps}
                selectedValue={selectedValue}
                onSelect={onSelect}
                setCurrentView={setCurrentView}
                currentView={currentView}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  easeInOut: [0, 0.71, 0.2, 1.01],
                }}
                className="max-h-full overflow-hidden rounded-b-3xl"
              >
                <SlotCalendar
                  scheduleProps={scheduleProps}
                  selectedValue={selectedValue}
                  onSelect={onSelect}
                  eventsByDate={eventsByDate}
                />
              </motion.div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AppointmentEvent, ScheduleProps } from "../../../types/types";
import MemoizedAppointmentList from "./AppointmentList";
import ListNav from "./ListNav";
import SlotCalendar from "./SlotCalendar";
import SearchResults from "./SearchResults";
dayjs.extend(customParseFormat);

export default function CalendarComponent({
  scheduleProps,
}: {
  scheduleProps: ScheduleProps;
}) {
  const [calendar, setCalendar] = useState(scheduleProps.user.id);
  const [value, setValue] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const [eventsByDate, setEventsByDate] = useState<AppointmentEvent[]>([]);
  const [currentView, setCurrentView] = useState<"list" | "calendar">(
    "calendar"
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleEventsByDate = () => {
      let filteredEvents: AppointmentEvent[] = [];

      scheduleProps.scheduleData.forEach((item) => {
        const result: AppointmentEvent[] = item.events.filter((event) => {
          if (currentView === "list") {
            return event.date === selectedValue.format("DD/MM/YYYY");
          } else if (currentView === "calendar") {
            const startOfWeek = selectedValue.startOf("week");
            const endOfWeek = selectedValue.endOf("week");
            const eventDate = dayjs(event.date, "DD/MM/YYYY");
            return (
              (eventDate.isAfter(startOfWeek) &&
                eventDate.isBefore(endOfWeek)) ||
              eventDate.isSame(startOfWeek) ||
              eventDate.isSame(endOfWeek)
            );
          }
          return false;
        });
        filteredEvents.push(...result);
      });

      const sortedEvents = [...filteredEvents].sort((a, b) => {
        return dayjs(a.start).valueOf() - dayjs(b.start).valueOf();
      });

      setEventsByDate(sortedEvents);
    };

    handleEventsByDate();
  }, [selectedValue, scheduleProps, currentView]);

  useEffect(() => {
    const allEvents: AppointmentEvent[] = [];
    scheduleProps.scheduleData.map((item) => allEvents.push(...item.events));
    const handleSearch = () => {
      const filteredEvents = allEvents.filter((event) =>
        event.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setEventsByDate(filteredEvents);
    };

    handleSearch();
  }, [searchQuery, setSearchQuery]);

  const onSelect = useCallback(
    (newValue: Dayjs) => {
      setValue(newValue);
      setSelectedValue(newValue);
    },
    [currentView]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="bg-white/40 rounded-3xl shadow-2xl dark:shadow-white/10 p-0">
      <ListNav
        selectedValue={selectedValue}
        setCurrentView={setCurrentView}
        currentView={currentView}
        onSelect={onSelect}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      {currentView === "list" ? (
        <MemoizedAppointmentList
          value={value}
          onSelect={onSelect}
          eventsByDate={eventsByDate}
        />
      ) : currentView === "calendar" && !searchQuery ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <SlotCalendar
            eventsByDate={eventsByDate}
            scheduleProps={scheduleProps}
            selectedDate={value}
          />
        </motion.div>
      ) : (
        <SearchResults searchQuery={searchQuery} events={eventsByDate} />
      )}
    </div>
  );
}

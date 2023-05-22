"use client";
import React, { useState, useCallback, useEffect, lazy, Suspense } from "react";
import MemoizedAppointmentList from "./AppointmentList";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AppointmentEvent, ScheduleProps } from "../../../types/types";
import ListNav from "./ListNav";
const LazySlotCalendar = lazy(() => import("./SlotCalendar"));
const SearchResults = lazy(() => import("./SearchResults"));
import { Table } from "antd";
dayjs.extend(customParseFormat);

export default function CalendarComponent({
  scheduleProps,
}: {
  scheduleProps: ScheduleProps;
}) {
  const [value, setValue] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const [eventsByDate, setEventsByDate] = useState<AppointmentEvent[]>([]);
  const [currentView, setCurrentView] = useState<"list" | "calendar">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("weekly");

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
      const handleSearch = () => {
        const allEvents: AppointmentEvent[] = [];
        scheduleProps.scheduleData.map((item) =>
          allEvents.push(...item.events)
        );
        const filteredEvents = allEvents.filter((event) =>
          event.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setEventsByDate(filteredEvents);
      };

      if (!searchQuery) return setEventsByDate(sortedEvents);
      return handleSearch();
    };

    handleEventsByDate();
  }, [selectedValue, scheduleProps, currentView, searchQuery, setSearchQuery]);

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
    <div className="bg-white/40  rounded-3xl shadow-2xl dark:shadow-white/10 p-0 w-full">
      <ListNav
        setViewMode={setViewMode}
        viewMode={viewMode}
        setSearchQuery={setSearchQuery}
        selectedValue={selectedValue}
        setCurrentView={setCurrentView}
        currentView={currentView}
        onSelect={onSelect}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      {currentView === "list" && !searchQuery ? (
        <MemoizedAppointmentList
          value={value}
          onSelect={onSelect}
          eventsByDate={eventsByDate}
        />
      ) : currentView === "calendar" && !searchQuery ? (
        <Suspense
          fallback={
            <Table
              size="large"
              loading
              pagination={false}
              bordered
              scroll={{ y: 1000 }}
            />
          }
        >
          <LazySlotCalendar
            setViewMode={setViewMode}
            viewMode={viewMode}
            eventsByDate={eventsByDate}
            scheduleProps={scheduleProps}
            selectedDate={value}
          />
        </Suspense>
      ) : (
        <Suspense
          fallback={
            <Table
              size="large"
              loading
              pagination={false}
              bordered
              scroll={{ y: 1000 }}
            />
          }
        >
          <SearchResults searchQuery={searchQuery} events={eventsByDate} />
        </Suspense>
      )}
    </div>
  );
}

"use client";
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { Table } from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AppointmentEvent, ScheduleProps } from "../../../types/types";
import ListNav from "./ListNav";
const MemoizedAppointmentList = lazy(() => import("./AppointmentList"));
const LazySlotCalendar = lazy(() => import("./SlotCalendar"));
const SearchResults = lazy(() => import("./SearchResults"));
dayjs.extend(customParseFormat);

export default function CalendarComponent({
  scheduleProps,
}: {
  scheduleProps: ScheduleProps;
}) {
  const [value, setValue] = useState(dayjs());
  const [selectedUser, setSelectedUser] = useState({
    value: scheduleProps.user.id,
    label: scheduleProps.user.name,
  });
  const [selectedValue, setSelectedValue] = useState(dayjs());
  const [eventsByDate, setEventsByDate] = useState<AppointmentEvent[]>([]);
  const [currentView, setCurrentView] = useState<"list" | "calendar">(
    "calendar"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("weekly");

  const sortedEvents = useMemo(() => {
    const selectedUserId = selectedUser.value;
    const filteredEvents = scheduleProps.scheduleData.find(
      ({ user }) => user.id === selectedUserId
    );
    const events = filteredEvents
      ? [
          ...filteredEvents.events,
          ...filteredEvents.customeEvents,
          ...filteredEvents.allbreaks,
        ]
      : [];
    return events.sort(
      (a, b) => dayjs(a.start).valueOf() - dayjs(b.start).valueOf()
    );
  }, [scheduleProps.scheduleData, selectedUser.value]);

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      setEventsByDate(sortedEvents);
    }
  }, [searchQuery, sortedEvents]);

  const handleUserChange = useCallback(
    (newValue: { value: string; label: string }) => {
      setSelectedUser(newValue);
    },
    []
  );

  const handleSearch = useCallback(() => {
    const allEvents = scheduleProps.scheduleData.flatMap((item) => item.events);
    const filteredEvents = allEvents.filter(
      (event) =>
        "customer" in event &&
        event.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setEventsByDate(filteredEvents);
  }, [scheduleProps.scheduleData, searchQuery]);

  const onSelect = useCallback((newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  }, []);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("event.target.value", event.target.value);

      setSearchQuery(event.target.value);
    },
    []
  );

  const loadingTable = (
    <Table
      size="large"
      loading
      pagination={false}
      bordered
      scroll={{ y: 1000 }}
    />
  );

  const calendarOrList = (
    <Suspense fallback={loadingTable}>
      {currentView === "list" && !searchQuery ? (
        <MemoizedAppointmentList
          value={value}
          onSelect={onSelect}
          eventsByDate={sortedEvents}
          business={scheduleProps.business}
        />
      ) : currentView === "calendar" && !searchQuery ? (
        <LazySlotCalendar
          eventsByDate={sortedEvents}
          scheduleProps={scheduleProps}
          selectedDate={selectedValue}
          selectedUser={selectedUser}
        />
      ) : (
        searchQuery && (
          <SearchResults
            business={scheduleProps.business}
            searchQuery={searchQuery}
            events={sortedEvents}
          />
        )
      )}
    </Suspense>
  );

  return (
    <div className="p-0 w-full overflow-hidden">
      <ListNav
        scheduleProps={scheduleProps}
        viewMode={"weekly"}
        selectedValue={selectedValue}
        currentView={"calendar"}
        onSelect={onSelect}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedUser={selectedUser}
        setSearchQuery={setSearchQuery}
        setSelectedUser={setSelectedUser}
      />
      {calendarOrList}
    </div>
  );
}

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
    const filteredEvents = scheduleProps.scheduleData.filter(
      ({ user }) => user.id === selectedUser.value
    );
    return filteredEvents[0]?.events.sort(
      (a, b) => dayjs(a.start).valueOf() - dayjs(b.start).valueOf()
    );
  }, [eventsByDate, selectedUser.value]);

  const handleUserChange = useCallback(
    (newValue: { value: string; label: string }) => {
      setSelectedUser(newValue);
    },
    [selectedUser]
  );
  const handleSearch = () => {
    const allEvents = scheduleProps.scheduleData.reduce<AppointmentEvent[]>(
      (acc, item) => acc.concat(item.events),
      []
    );

    const filteredEvents = allEvents.filter((event) =>
      event.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setEventsByDate(filteredEvents);
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      sortedEvents && setEventsByDate(sortedEvents);
    }
  }, [searchQuery, eventsByDate]);

  const onSelect = useCallback((newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  }, []);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    [searchQuery]
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

  const calendarOrList =
    currentView === "list" && !searchQuery ? (
      <MemoizedAppointmentList
        value={value}
        onSelect={onSelect}
        eventsByDate={sortedEvents || []}
        business={scheduleProps.business}
      />
    ) : currentView === "calendar" && !searchQuery ? (
      <LazySlotCalendar
        eventsByDate={sortedEvents || []}
        scheduleProps={scheduleProps}
        selectedDate={selectedValue}
        selectedUser={selectedUser}
        onSelect={onSelect}
        handleSearchChange={handleSearchChange}
        setSelectedUser={handleUserChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    ) : (
      <SearchResults
        business={scheduleProps.business}
        searchQuery={searchQuery}
        events={sortedEvents || []}
      />
    );

  return (
    <div className="p-0 w-full overflow-hidden">
      {/* <Suspense fallback={<>loading...</>}>
        <ListNav
          scheduleProps={scheduleProps}
          viewMode={viewMode}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setSearchQuery={setSearchQuery}
          selectedValue={selectedValue}
          currentView={currentView}
          onSelect={onSelect}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </Suspense> */}
      <Suspense fallback={loadingTable}>{calendarOrList}</Suspense>
    </div>
  );
}

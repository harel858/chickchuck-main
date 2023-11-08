"use client";
import "./AppointmentList.css";
import React, { useState } from "react";
import CustomRow from "./CustomRow";
import { Table, Tooltip } from "antd";
import { motion } from "framer-motion";
import { ScheduleProps, AppointmentEvent } from "../../../types/types";
import dayjs, { Dayjs } from "dayjs";
import CalendarEvent from "./CalendarEvent";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ListNav from "./ListNav";
dayjs.extend(customParseFormat);

const SlotCalendar = ({
  scheduleProps,
  eventsByDate: allEvents,
  selectedDate,
  selectedUser,
  onSelect,
  handleSearchChange,
  searchQuery,
  setSelectedUser,
  setSearchQuery,
}: {
  selectedUser: {
    value: string;
    label: string;
  };
  scheduleProps: ScheduleProps;
  eventsByDate: AppointmentEvent[];
  selectedDate: dayjs.Dayjs;
  onSelect: (newValue: Dayjs) => void;
  searchQuery: string;
  setSelectedUser: React.Dispatch<
    React.SetStateAction<{
      value: string;
      label: string;
    }>
  >;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;

  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [loading, setLoading] = useState(true); // Initialize loading state as true
  const eventsByDate = allEvents.filter(
    (event) => event.userId === selectedUser.value
  );
  const { scheduleData, business, user } = scheduleProps;
  const today = dayjs().startOf("day").toDate();
  const isToday = (date: Date) => dayjs(date).isSame(today, "day");
  const startOfWeek = selectedDate.startOf("week").day(0);
  const weekDates = [...Array(7)].map((_, i) =>
    startOfWeek.add(i, "day").toDate()
  );

  const slotsByDay = React.useMemo(() => {
    return weekDates.map((date) => {
      const daySchedule = scheduleData.find((schedule) =>
        schedule.events.some(
          (event) => event.date === dayjs(date).format("DD/MM/YYYY")
        )
      );

      const events = eventsByDate.filter(
        (event) => event.date === dayjs(date).format("DD/MM/YYYY")
      );

      const daySlots = daySchedule ? daySchedule.events : [];
      return [...daySlots, ...events];
    });
  }, [weekDates, scheduleData, eventsByDate]);

  const openingTime = dayjs(user.startActivity);
  const closingTime = dayjs(user.endActivity);
  const totalSlots = closingTime.diff(openingTime, "minute") / 5;

  const hours = React.useMemo(() => {
    const hoursData = [...Array(totalSlots)].map((_, i) => {
      const minutes = i * 5;
      const time = openingTime.add(minutes, "minute").format("HH:mm");
      const row: {
        key: string | null;
        time: string | null;
        [date: string]: string | AppointmentEvent | null | undefined;
      } = { key: time || null, time: time || null };

      const slotEvent = eventsByDate.find((event) => {
        return (
          dayjs(event.start).format("HH:mm") === time &&
          weekDates.some(
            (date) => dayjs(date).format("DD/MM/YYYY") === event.date
          )
        );
      });

      if (slotEvent) {
        row.event = slotEvent;
      }

      weekDates.forEach((date, index) => {
        const slots = slotsByDay[index]?.filter(
          (event) =>
            dayjs(event.start).format("HH:mm") === time &&
            event.date === dayjs(date).format("DD/MM/YYYY")
        );

        row[dayjs(date).format("DD/MM/YYYY")] =
          slots && slots.length > 0 ? slots[0]?.id : null;
      });
      return row;
    });
    setLoading(false); // Set isLoading to false when hours data is ready
    return hoursData;
  }, [
    openingTime,
    closingTime,
    totalSlots,
    eventsByDate,
    weekDates,
    slotsByDay,
  ]);

  const timeColumn = {
    title: "Time",
    dataIndex: "time",
    key: "time",
    className: ` w-20 text-center !important text-xl font-md p-0 !important m-0 border-x border-black/20 dark:border-orange-500 bg-slate-200 dark:text-white dark:bg-slate-700`,
    sticky: true,
    width: 50, // Adjust the width value as needed
    onCell: (row: any) => ({
      onClick: () => row, // Log the hour from the initial row
      row: row,
    }),
    onHeaderCell: () => ({
      className: `text-center text-xl font-md pt-0 m-0 dark:border-orange-500 bg-black dark:text-white dark:bg-slate-700 !important`,
    }),
  };
  const columns = React.useMemo(() => {
    return [
      timeColumn,
      ...weekDates.map((date, index) => {
        const isCurrentDate =
          dayjs(date).format("DD/MM/YYYY") == dayjs().format("DD/MM/YYYY");
        return {
          title: dayjs(date).format("dd D"),
          dataIndex: dayjs(date).format("DD/MM/YYYY"),
          onCell: (record: any) => ({
            onClick: () => record, // Log the hour from the initial record
            record: { ...record, date: date },
            children: [dayjs(date).format("DD/MM/YYYY")],
          }),
          render: (eventId: string | AppointmentEvent) => {
            const event =
              typeof eventId === "string"
                ? eventsByDate.find((e) => e.id === eventId)
                : eventId;

            if (!event) {
              return null;
            }

            const startSlotIndex = hours.findIndex(
              (slot) => slot.time === dayjs(event.start).format("HH:mm")
            );
            const endSlotIndex = hours.findIndex(
              (slot) => slot.time === dayjs(event.end).format("HH:mm")
            );

            if (startSlotIndex === -1 || endSlotIndex === -1) {
              return null;
            }

            const eventRowSpan = endSlotIndex - startSlotIndex + 1;

            return (
              <div
                className={`flex justify-center items-center p-0 m-0 absolute top-0 left-0 right-0 w-full h-full z-40 overflow-visible `}
                style={{ height: `${(eventRowSpan - 1) * 53}px` }}
              >
                {hours.map((slot, slotIndex) => {
                  if (
                    slotIndex >= startSlotIndex &&
                    slotIndex <= endSlotIndex
                  ) {
                    if (typeof eventId === "string" && slot.id === eventId) {
                      return (
                        <CalendarEvent
                          key={event.id}
                          viewMode={"weekly"}
                          event={event}
                          business={scheduleProps.business}
                        />
                      );
                    } else if (
                      typeof slot.event !== "string" &&
                      slot.event &&
                      slot.event.id === event.id
                    ) {
                      return (
                        <CalendarEvent
                          key={slot.event.id}
                          viewMode={"weekly"}
                          event={slot.event}
                          business={scheduleProps.business}
                        />
                      );
                    } else {
                      return null;
                    }
                  } else {
                    return null;
                  }
                })}
              </div>
            );
          },

          onHeaderCell: () => ({
            className: `text-center text-xl font-md pt-0 m-0 ${
              isCurrentDate ? "todayDate" : "bg-black"
            } dark:text-white dark:bg-slate-700`,
          }),
        };
      }),
    ];
  }, [weekDates, hours, eventsByDate]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="overflow-x-auto rounded-b-3xl"
    >
      <Table
        tableLayout="fixed"
        dataSource={hours}
        columns={columns}
        pagination={false}
        bordered
        title={() => (
          <ListNav
            scheduleProps={scheduleProps}
            viewMode={"weekly"}
            selectedValue={selectedDate}
            currentView={"calendar"}
            onSelect={onSelect}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedUser={selectedUser}
            setSearchQuery={setSearchQuery}
            setSelectedUser={setSelectedUser}
          />
        )}
        loading={loading}
        size="large"
        components={{
          body: {
            cell: (props: any) =>
              CustomRow({ ...props, userid: selectedUser.value }, openingTime),
          },
        }}
        rowKey={(record) => record.key || ""}
        scroll={{ x: "max-content", y: 480 }} // Specify a pixel width for x
        className="slotCalendar relative top-0 rounded-t-none overflow-hidden bg-orange-300/75"
      />
    </motion.div>
  );
};

export default React.memo(SlotCalendar);

"use client";
import "./AppointmentList.css";
import React, { useState } from "react";
import { Table, Button } from "antd";
import { motion } from "framer-motion";
import { ScheduleProps, AppointmentEvent } from "../../../types/types";
import dayjs from "dayjs";
import CalendarEvent from "./CalendarEvent";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const SlotCalendar = ({
  scheduleProps,
  eventsByDate,
  selectedDate,
  setViewMode,
  viewMode,
}: {
  scheduleProps: ScheduleProps;
  eventsByDate: AppointmentEvent[];
  selectedDate: dayjs.Dayjs;
  setViewMode: React.Dispatch<React.SetStateAction<"weekly" | "daily">>;
  viewMode: "weekly" | "daily";
}) => {
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
  const totalSlots = (closingTime.diff(openingTime, "minute") + 1) / 15;

  const hours = React.useMemo(() => {
    return [...Array(totalSlots)].map((_, i) => {
      const minutes = i * 15;
      const time = openingTime.add(minutes, "minute").format("HH:mm");

      const row: {
        key: string | null;
        time: string | null;
        [date: string]: string | AppointmentEvent | null;
      } = { key: time, time };

      const slotEvent = eventsByDate.find(
        (event) =>
          dayjs(event.start).format("HH:mm") === time &&
          weekDates.some(
            (date) => dayjs(date).format("DD/MM/YYYY") === event.date
          )
      );

      if (slotEvent) {
        row.event = slotEvent;
      }

      weekDates.forEach((date, index) => {
        const slots = slotsByDay[index].filter(
          (event) =>
            dayjs(event.start).format("HH:mm") === time &&
            event.date === dayjs(date).format("DD/MM/YYYY")
        );

        row[dayjs(date).format("DD/MM/YYYY")] =
          slots.length > 0 ? slots[0].id : null;
      });

      return row;
    });
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
    className: `text-center !important text-xl font-md p-0 !important m-0 border-x border-black/20 dark:border-orange-500 bg-white dark:text-white dark:bg-slate-700`,
    sticky: true,
    width: 50, // Adjust the width value as needed
    onHeaderCell: () => ({
      className: `text-center text-xl font-md pt-0 m-0 border- dark:border-orange-500 bg-black dark:text-white dark:bg-slate-700 !important`,
    }),
  };
  const columns = React.useMemo(() => {
    return [
      timeColumn,
      ...weekDates.map((date, index) => ({
        title: dayjs(date).format("MMMM D"),
        dataIndex: dayjs(date).format("DD/MM/YYYY"),
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
              className="flex justify-center items-center p-0 m-0 absolute top-0 left-0 right-0 w-full h-full z-40 overflow-visible"
              style={{ height: `${(eventRowSpan - 1) * 60}px` }}
            >
              {hours.map((slot, slotIndex) => {
                if (slotIndex >= startSlotIndex && slotIndex <= endSlotIndex) {
                  if (typeof eventId === "string" && slot.id === eventId) {
                    return (
                      <CalendarEvent
                        key={event.id}
                        viewMode={viewMode}
                        event={event}
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
                        viewMode={viewMode}
                        event={slot.event}
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
        className: `text-center pt-0 m-0 ${
          isToday(date)
            ? "bg-gray-500/20 dark:bg-black/50"
            : "bg-white dark:bg-slate-700"
        }`,
        onHeaderCell: () => ({
          className: `text-center text-xl font-md pt-0 m-0 bg-black dark:text-white dark:bg-slate-700 !important`,
        }),
      })),
    ];
  }, [weekDates, hours, eventsByDate]);

  const dailyColumns = [
    timeColumn,
    ...columns.filter(
      (item) => item.dataIndex === selectedDate.format("DD/MM/YYYY")
    ),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="overflow-x-auto rounded-b-3xl"
    >
      {viewMode === "weekly" ? (
        <Table
          tableLayout="fixed"
          dataSource={hours}
          columns={columns}
          pagination={false}
          bordered
          size="large"
          rowKey={(record) => record.key || ""}
          scroll={{ y: 450, x: true }}
          className="slotCalendar relative top-0 rounded-t-none overflow-hidden bg-orange-300/75"
        />
      ) : (
        <Table
          tableLayout="fixed"
          dataSource={hours}
          columns={dailyColumns}
          pagination={false}
          bordered
          size="large"
          rowKey={(record) => record.key || ""}
          scroll={{ y: 450, x: true }}
          className="slotCalendar relative top-0 overflow-hidden bg-orange-300/75"
        />
      )}
    </motion.div>
  );
};

export default SlotCalendar;

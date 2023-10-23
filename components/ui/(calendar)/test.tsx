"use client";
import "./AppointmentList.css";
import React from "react";
import { Table } from "antd";
import { motion } from "framer-motion";
import { ScheduleProps, AppointmentEvent } from "../../../types/types";
import dayjs from "dayjs";
import CalendarEvent from "./CalendarEvent";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";

function CustomRow(props: any) {
  const time = props?.record?.time;

  return (
    <Tooltip title={time}>
      <td className="hover:bg-black" {...props} />
    </Tooltip>
  );
}

dayjs.extend(customParseFormat);
const SlotCalendar = ({
  scheduleProps,
  eventsByDate,
  selectedDate,
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

  const openingTime = dayjs(business.openingTime);
  const closingTime = dayjs(business.closingTime);
  const totalSlots = closingTime.diff(openingTime, "minute") / 5;

  const hours = React.useMemo(() => {
    return [...Array(totalSlots)].map((_, i) => {
      const minutes = i * 5;
      const time = openingTime.add(minutes, "minute").format("HH:mm");

      const row: {
        key: string | null;
        time: string | null;
        [date: string]: string | AppointmentEvent[] | null | undefined;
      } = { key: time, time };

      const slotEvent = eventsByDate.find((event) => {
        return (
          dayjs(event.start).format("HH:mm") === time &&
          scheduleData.some(({ user }) => user.id === event.userId)
        );
      });

      if (slotEvent) {
        row.event = [slotEvent];
      }

      scheduleData.forEach(({ user, events }, index) => {
        const slots = eventsByDate?.filter(
          (event) =>
            dayjs(event.start).format("HH:mm") === time &&
            event.date === dayjs(selectedDate).format("DD/MM/YYYY")
        );

        row[user.id] = slots?.length && slots?.length > 0 ? slots : null;
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
    className: `text-center !important text-xl font-md p-0 !important m-0 border-x border-black/20 dark:border-orange-500 bg-orange-200 dark:text-white dark:bg-slate-700`,
    sticky: true,
    width: 50, // Adjust the width value as needed
    onHeaderCell: () => ({
      className: `text-center text-xl font-md pt-0 m-0 dark:border-orange-500 bg-black dark:text-white dark:bg-slate-700 !important`,
    }),
  };
  const columns: ColumnsType<{
    [date: string]: string | AppointmentEvent[] | null | undefined;
    key: string | null;
    time: string | null;
  }> = React.useMemo(() => {
    return [
      timeColumn,
      ...scheduleData.map(({ user }, index) => ({
        title: user.name,
        dataIndex: user.id,
        onCell: (record: any) => ({
          onClick: () => record, // Log the hour from the initial row
          record: record,
        }),

        className: `hover:bg-black !important cursor-pointer text-center pt-0 m-0 bg-sky-200/90 dark:bg-slate-700`,
        onHeaderCell: () => ({
          className: `text-center text-xl font-md pt-0 m-0 bg-black dark:text-white dark:bg-slate-700`,
        }),
        render: (events: AppointmentEvent[] | null) => {
          if (!events) {
            return null;
          }

          const filteredEvents = events.filter(
            (event) => event.userId === user.id
          );
          console.log("filteredEvents", filteredEvents);

          if (filteredEvents.length === 0) {
            return null;
          }

          return (
            <div className="event-container">
              {filteredEvents.map((event) => (
                <CalendarEvent
                  key={event.id}
                  viewMode={viewMode}
                  event={event}
                  business={scheduleProps.business}
                />
              ))}
            </div>
          );
        },
      })),
    ];
  }, [weekDates, hours, eventsByDate]);

  // Your SlotCalendar component...

  const dailyColumns = [
    timeColumn,
    ...columns.filter((item) => item.key === selectedDate.format("DD/MM/YYYY")),
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
          components={{
            body: {
              cell: CustomRow,
            },
          }}
          pagination={false}
          bordered
          size="large"
          rowKey={(record) => record.key || ""}
          scroll={{ y: 450, x: true }}
          className="slotCalendar  relative top-0 rounded-t-none overflow-hidden bg-orange-300/75"
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

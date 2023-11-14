"use client";
import React from "react";
import { Table } from "antd";
import { motion } from "framer-motion";
import { ScheduleProps, AppointmentEvent } from "../../../types/types";
import dayjs, { Dayjs } from "dayjs";
import CalendarEvent from "./CalendarEvent";
import CustomRow from "./CustomRow";

const SlotCalendar = ({
  scheduleProps,
  eventsByDate,
  selectedDate,
  selectedUser,
}: {
  selectedUser: {
    value: string;
    label: string;
  };
  scheduleProps: ScheduleProps;
  eventsByDate: AppointmentEvent[];
  selectedDate: dayjs.Dayjs;
}) => {
  const { user } = scheduleProps;
  console.log("user", user);

  const openingTime = dayjs(user.startActivity);

  const startOfWeek = selectedDate.startOf("week").day(0);
  const weekDates = [...Array(7)].map((_, i) =>
    startOfWeek.add(i, "day").toDate()
  );

  const hours = React.useMemo(() => {
    const openingTime = dayjs(user.startActivity);
    const closingTime = dayjs(user.endActivity);
    const totalSlots = closingTime.diff(openingTime, "minute") / 5;

    return [...Array(totalSlots)].map((_, i) => {
      const minutes = i * 5;
      const time = openingTime.add(minutes, "minute").format("HH:mm");

      const slots = eventsByDate.filter(
        (event) =>
          dayjs(event.start).format("HH:mm") === time &&
          weekDates.some(
            (date) => dayjs(date).format("DD/MM/YYYY") === event.date
          )
      );

      return {
        key: time || null,
        time: time || null,
        [slots[0]?.date || ""]: slots[0]?.id || null,
      };
    });
  }, [eventsByDate, user, weekDates]);

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
      className: `bg-slate-200 !important text-center text-xl font-md pt-0 m-0 dark:border-orange-500  dark:text-white dark:bg-slate-700 !important`,
    }),
  };
  const columns = React.useMemo(() => {
    return [
      timeColumn,
      ...weekDates.map((date, index) => {
        const isCurrentDate =
          dayjs(date).format("DD/MM/YYYY") == dayjs().format("DD/MM/YYYY");
        console.log("isCurrentDate", isCurrentDate);

        return {
          title: dayjs(date).format("dd D"),
          dataIndex: dayjs(date).format("DD/MM/YYYY"),
          onCell: (record: any) => ({
            onClick: () => record, // Log the hour from the initial record
            record: { ...record, date: date },
            children: [dayjs(date).format("DD/MM/YYYY")],
          }),
          className: "h-5 !important",
          render: (eventId: string | null) => {
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
                style={{ height: `${(eventRowSpan - 1) * 58}px` }}
              >
                {hours.map((slot, slotIndex) => {
                  if (
                    slotIndex >= startSlotIndex &&
                    slotIndex <= endSlotIndex
                  ) {
                    if (
                      typeof eventId === "string" &&
                      slot[dayjs(date).format("DD/MM/YYYY")] === eventId
                    ) {
                      return (
                        <CalendarEvent
                          key={event.id}
                          viewMode={"weekly"}
                          event={event}
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
  }, [weekDates]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="overflow-x-auto rounded-b-3xl flex flex-col justify-center items-center"
    >
      <Table
        tableLayout="fixed"
        dataSource={hours}
        columns={columns}
        pagination={false}
        bordered
        size="large"
        components={{
          body: {
            cell: (props: any) =>
              CustomRow(
                {
                  ...props,
                  scheduleprops: scheduleProps,
                  userid: selectedUser.value,
                },
                openingTime
              ),
          },
        }}
        rowKey={(record) => record.key || ""}
        scroll={{ x: "max-content", y: 485 }}
        className="slotCalendar relative top-0 rounded-t-none overflow-hidden bg-slate-200/75"
      />
    </motion.div>
  );
};

export default React.memo(SlotCalendar);

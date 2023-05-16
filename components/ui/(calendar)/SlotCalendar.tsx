import React from "react";
import { Table } from "antd";
import { Appointment } from "@prisma/client";
import { ScheduleProps, AppointmentEvent } from "../../../types/types";
import dayjs, { Dayjs } from "dayjs";
import CalendarEvent from "./CalendarEvent";

const SlotCalendar = ({
  scheduleProps,
  selectedValue,
  onSelect,
  eventsByDate,
}: {
  selectedValue: dayjs.Dayjs;
  scheduleProps: ScheduleProps;
  onSelect: (newValue: Dayjs) => void;
  eventsByDate: AppointmentEvent[];
}) => {
  const { scheduleData, business, user } = scheduleProps;
  // Generate an array of dates for the current week
  const startOfWeek = dayjs().startOf("week").day(0);
  const weekDates = [...Array(7)].map((_, i) =>
    startOfWeek.add(i, "day").toDate()
  );

  // Generate an array of time slots for each day of the week
  const slotsByDay = weekDates.map((date) => {
    const daySchedule = scheduleData.find((schedule) =>
      /*  schedule.user.id === scheduleProps.user.id && */
      schedule.events.find((event) => {
        return event.date === dayjs(date).format("DD/MM/YYYY");
      })
    );

    const events = eventsByDate.filter(
      (event) => event.date === dayjs(date).format("DD/MM/YYYY")
    );

    const daySlots = daySchedule ? daySchedule.events : [];
    return [...daySlots, ...events];
  });

  // Generate an array of rows for the table, representing each 5-minute interval of the day
  const openingTime = dayjs(user.startActivity);
  const closingTime = dayjs(user.endActivity);
  const totalSlots = closingTime.diff(openingTime, "minute") / 5;

  const hours = [...Array(totalSlots)].map((_, i) => {
    console.log(totalSlots);

    const minutes = i * 5;
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
      console.log(row);
    }

    weekDates.forEach((date, index) => {
      const slots = slotsByDay[index].filter(
        (event) =>
          dayjs(event.start).format("HH:mm") === time &&
          event.date === dayjs(date).format("DD/MM/YYYY")
      );

      if (slots.length > 0) {
        row[date.toLocaleDateString()] = slots[0].id;
      } else {
        row[date.toLocaleDateString()] = null; // add null value for empty cells
      }
    });

    return row;
  });

  console.log(weekDates);

  // Generate an array of columns for the table, representing each day of the week
  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    ...weekDates.map((date, index) => ({
      title: date.toLocaleDateString(),
      dataIndex: date.toLocaleDateString(),
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

        const eventRowSpan = endSlotIndex - startSlotIndex + 1; // Calculate the number of rows the event spans
        console.log(eventRowSpan);

        return (
          <div
            className="p-0 m-0 absolute top-0 left-0 right-0 w-full h-full z-40 overflow-visible"
            style={{ height: `${eventRowSpan * 49.5}px` }}
          >
            {hours.map((slot, slotIndex) => {
              if (slotIndex >= startSlotIndex && slotIndex <= endSlotIndex) {
                // Render the event in the rows it spans
                if (typeof eventId === "string" && slot.id === eventId) {
                  return <CalendarEvent key={event.id} event={event} />;
                } else if (
                  typeof slot.event !== "string" &&
                  slot.event &&
                  slot.event.id === event.id
                ) {
                  return (
                    <CalendarEvent key={slot.event.id} event={slot.event} />
                  );
                } else {
                  return null; // Skip rendering for slots that are not part of the event duration
                }
              } else {
                return null;
              }
            })}
          </div>
        );
      },
      className: "absolute pt-0 m-0 border-x  border-black/20", // Add the class name for the table column
    })),
  ];

  return (
    <Table
      dataSource={hours}
      columns={columns}
      pagination={false}
      bordered
      size="large"
      rowKey={(record) => record.key || ""}
      scroll={{ y: 450 }} // Adjust the value as per your requirement
      className="relative top-0 overflow-hidden "
    />
  );
};

export default SlotCalendar;

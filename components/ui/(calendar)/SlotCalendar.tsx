import React from "react";
import { Table } from "antd";
import { Appointment } from "@prisma/client";
import { ScheduleProps, AppointmentEvent } from "../../../types/types";
import dayjs, { Dayjs } from "dayjs";

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
  const weekDates = [...Array(7)].map(
    (_, i) => new Date(Date.now() + i * 24 * 60 * 60 * 1000)
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
    const minutes = i * 5;
    const time = openingTime.add(minutes, "minute").format("HH:mm");

    const row: {
      key: string | null;
      time: string | null;
    } = { key: time, time };

    weekDates.forEach((date, index) => {
      const slots = slotsByDay[index].filter(
        (event) =>
          dayjs(event.start).format("HH:mm") === time &&
          event.date === dayjs(date).format("DD/MM/YYYY")
      );

      if (slots.length > 0) {
        console.log(slots);

        row[date.toLocaleDateString() as keyof typeof row] = slots[0].id;
      } else {
        row[date.toLocaleDateString() as keyof typeof row] = null; // add null value for empty cells
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
    ...weekDates.map((date) => ({
      title: date.toLocaleDateString(),
      dataIndex: date.toLocaleDateString(),
      render: (eventId: string) => {
        const event = eventsByDate.find((e) => e.id === eventId);

        if (!event) {
          return null;
        }

        return (
          <div key={event.id}>
            <div>{event.customer.name}</div>
            <div>
              {event.start} - {event.end}
            </div>
          </div>
        );
      },
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
    />
  );
};

export default SlotCalendar;

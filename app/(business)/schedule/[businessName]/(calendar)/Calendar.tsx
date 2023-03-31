"use client";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { Alert, Calendar } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Appointment,
  AppointmentSlot,
  Customer,
  Treatment,
} from "@prisma/client";
dayjs.extend(customParseFormat);

function CalendarComponent({
  appointments,
}: {
  appointments: (Appointment & {
    appointmentSlot: AppointmentSlot;
    treatment: Treatment;
    customer: Customer;
  })[];
}) {
  const [events, setEvents] = React.useState<any[]>([]);
  const [value, setValue] = React.useState(() => dayjs("2017-01-25"));
  const [selectedValue, setSelectedValue] = React.useState(() =>
    dayjs("2017-01-25")
  );

  React.useEffect(() => {
    const events = appointments.map((appointment) => {
      const start = dayjs(appointment.appointmentSlot.date, "DD/MM/YYYY")
        .hour(parseInt(appointment.appointmentSlot.start.split(":")[0]))
        .minute(parseInt(appointment.appointmentSlot.start.split(":")[1]))
        .toISOString();
      const end = dayjs(appointment.appointmentSlot.date, "DD/MM/YYYY")
        .hour(parseInt(appointment.appointmentSlot.end.split(":")[0]))
        .minute(parseInt(appointment.appointmentSlot.end.split(":")[1]))
        .toISOString();
      return {
        start,
        end,
        text: appointment.treatment.title,
        color: "#007aff", // set a default color for all events
      };
    });

    setEvents(events);
  }, [appointments]);
  console.log(events);

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col w-1/2 fixed rounded-full">
      <Alert
        message={`You selected date: ${selectedValue?.format("YYYY-MM-DD")}`}
      />
      <Calendar
        className="rounded-xl p-5 w-1/2"
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
    </div>
  );
}

export default CalendarComponent;

"use client";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar } from "@mobiscroll/react";
import {
  Appointment,
  AppointmentSlot,
  Customer,
  Treatment,
} from "@prisma/client";
dayjs.extend(customParseFormat);

function Calendar({
  appointments,
}: {
  appointments: (Appointment & {
    appointmentSlot: AppointmentSlot;
    treatment: Treatment;
    customer: Customer;
  })[];
}) {
  console.log(appointments);

  const [myEvents, setEvents] = React.useState<any[]>([]);

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

  const responsive = React.useMemo(() => {
    return {
      xsmall: {
        view: {
          calendar: {
            type: "week",
          },
          agenda: {
            type: "day",
          },
        },
      },
      custom: {
        // Custom breakpoint
        breakpoint: 600,
        view: {
          calendar: {
            labels: true,
          },
        },
      },
    };
  }, []);

  return (
    <Eventcalendar
      theme="ios"
      themeVariant="light"
      clickToCreate={false}
      dragToCreate={false}
      dragToMove={false}
      dragToResize={false}
      eventDelete={false}
      data={myEvents}
      responsive={responsive}
    />
  );
}

export default Calendar;

"use client";
import React from "react";
import "./style.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Appointment, Customer, Treatment } from "@prisma/client";

function Calendar({
  appointments,
}: {
  appointments: (Appointment & {
    treatment: Treatment;
    customer: Customer;
  })[];
}) {
  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={appointments.map((appointment) => ({
          title: appointment.treatment.title,
          start: appointment.dateTime,
          end: appointment.dateTime,
          classNames:
            appointment.status === "COMPLETED"
              ? "bg-green-500"
              : appointment.status === "CANCELLED"
              ? "bg-red-500"
              : "bg-blue-500",
          extendedProps: {
            appointment: appointment,
          },
        }))}
        headerToolbar={{
          left: "today",
          center: "prev,title,next",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={`100vh`}
        editable={true}
        droppable={true}
        eventClick={(eventClickInfo) => {
          console.log(eventClickInfo.event.extendedProps.appointment);
        }}
        dayCellContent={(cellInfo) => {
          return (
            <span className="text-sm font-medium">
              {cellInfo.date.getDate()}
            </span>
          );
        }}
        eventContent={(eventContentInfo) => {
          return (
            <div className="p-1 bg-white rounded-md shadow-sm cursor-pointer hover:shadow-md">
              <div className="text-sm font-medium">
                {eventContentInfo.event.title}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(
                  eventContentInfo.event.start ?? ""
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}

export default Calendar;

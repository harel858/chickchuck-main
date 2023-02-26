"use client";
import React, { useState, useEffect } from "react";
import "./style.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { appointment, treatment, User } from "@prisma/client";

function Calendar({ appointments }: { appointments: appointment[] }) {
  // Update the event in the state
  console.log(new Date());

  return (
    <div className="w-full">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={[
          {
            title: "Event 1",
            start: "2023-03-01T10:00:00",
            end: "2023-03-01T10:15:00",
          },
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        dayHeaderClassNames="text-white"
        viewClassNames="text-white"
        eventClassNames="text-pink-500"
        allDayClassNames="text-white"
        slotLaneClassNames="text-pink-500"
        dayCellClassNames="text-black bg-white/[0.1] border-pink-500 border"
        moreLinkClassNames="text-white"
        nowIndicatorClassNames="text-red-500"
        slotLabelClassNames="text-red-500"
        weekNumberClassNames="text-pink-900"
        height={`100vh`}
        editable={true}
        droppable={true}
      />
    </div>
  );
}

export default Calendar;

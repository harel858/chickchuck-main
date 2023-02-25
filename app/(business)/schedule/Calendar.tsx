"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { appointment, treatment, User } from "@prisma/client";

function Calendar({ appointments }: { appointments: appointment[] }) {
  const handleDrop = (info: any) => {
    // Get the event being dragged and the target date
    const event = info?.event;
    const date = info?.date;

    // Update the start and end times of the event
    const start = event.start;
    const end = event.end;
    const newStart = date;
    const newEnd = new Date(
      newStart.getTime() + (end.getTime() - start.getTime())
    );
  };

  // Update the event in the state

  return (
    <div className="w-full">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={appointments}
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
        eventDrop={handleDrop}
      />
    </div>
  );
}

export default Calendar;

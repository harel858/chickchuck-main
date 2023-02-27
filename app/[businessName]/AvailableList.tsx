"use client";
import Calendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

// Define the available time slots
const availableSlots = [
  {
    start: "2022-03-01T09:00:00",
    end: "2022-03-01T10:00:00",
  },
  {
    start: "2022-03-02T11:00:00",
    end: "2022-03-02T12:00:00",
  },
  // ... add more available slots
];

// Map the available time slots to FullCalendar events
const events = availableSlots.map((slot) => ({
  title: "Available",
  start: slot.start,
  end: slot.end,
}));

export function AvailableList() {
  return (
    <Calendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      events={events}
      // Handle event click to schedule an appointment
      eventClick={(info) => {
        // Open a modal to collect appointment details
        console.log("Selected:", info.event.start, info.event.end);
      }}
    />
  );
}

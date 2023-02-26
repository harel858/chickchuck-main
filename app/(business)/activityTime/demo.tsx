"use client";
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";

interface Schedule {
  [day: string]: {
    startTime: Date | null;
    endTime: Date | null;
  } | null;
}

function SchedulePicker() {
  const [schedule, setSchedule] = useState<Schedule>({});

  const handleDaySelect = (day: string, selected: Date | null) => {
    // Update schedule for selected day
    setSchedule({
      ...schedule,
      [day]: selected ? { startTime: null, endTime: null } : null,
    });
  };

  const handleTimeSelect = (day: string, time: [Date, Date]) => {
    // Update schedule for selected day with start and end times
    setSchedule({
      ...schedule,
      [day]: {
        startTime: time[0],
        endTime: time[1],
      },
    });
  };

  return (
    <div>
      <h2>Choose your work schedule:</h2>
      <div>
        <label>Monday:</label>
        <DateTimePicker
          onChange={(selected) => handleDaySelect("monday", selected)}
          value={schedule.monday?.startTime || undefined}
        />
        {schedule.monday && (
          <DateTimePicker
            onChange={(time) => handleTimeSelect("monday", [time, time])}
            value={[
              schedule.monday.startTime || new Date(),
              schedule.monday.endTime || new Date(),
            ]}
            calendarIcon={null}
            clearIcon={null}
            disableClock
            format="hh:mm a"
          />
        )}
      </div>
      <div>
        <label>Tuesday:</label>
        <DateTimePicker
          onChange={(selected) => handleDaySelect("tuesday", selected)}
          value={schedule.tuesday?.startTime || undefined}
        />
        {schedule.tuesday && (
          <DateTimePicker
            onChange={(time) => handleTimeSelect("tuesday", [time, time])}
            value={[
              schedule.tuesday.startTime || new Date(),
              schedule.tuesday.endTime || new Date(),
            ]}
            calendarIcon={null}
            clearIcon={null}
            disableClock
            format="hh:mm a"
          />
        )}
      </div>
      {/* Repeat for all other days of the week */}
    </div>
  );
}
export default SchedulePicker;

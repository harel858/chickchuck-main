"use client";
import React from "react";
import AppointmentList from "./AppointmentList";
import { Calendar, theme } from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AppointmentEvent } from "../../../../../types";
dayjs.extend(customParseFormat);

function CalendarComponent({ events }: { events: AppointmentEvent[] }) {
  const { token } = theme.useToken();
  const [value, setValue] = React.useState(() => dayjs());
  const [selectedValue, setSelectedValue] = React.useState(() => dayjs());
  const [eventsByDate, setEventsByDate] = React.useState<AppointmentEvent[]>(
    []
  );
  React.useEffect(() => {
    const value: AppointmentEvent[] = [];

    events.map((event, i) => {
      if (event.date === selectedValue.format("DD/MM/YYYY")) value.push(event);
      return;
    });
    console.log(value);
    setEventsByDate(value);
  }, [value, selectedValue]);

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  return (
    <section className="flex justify-center content-center mt-28 w-2/5">
      <div>
        <Calendar
          className="border-2 border-black"
          style={wrapperStyle}
          fullscreen={false}
          onPanelChange={onPanelChange}
          value={value}
          onSelect={onSelect}
        />
      </div>
      <AppointmentList
        selectedValue={selectedValue}
        eventsByDate={eventsByDate}
      />
    </section>
  );
}

export default CalendarComponent;

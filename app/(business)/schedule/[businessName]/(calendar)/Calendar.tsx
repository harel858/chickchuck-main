"use client";
import React from "react";
import AppointmentList from "./AppointmentList";
import { Calendar, ConfigProvider, theme } from "antd";
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
    width: 500,
    borderRadius: "1.5rem",
    borderTopRightRadius: "0",
    fontSize: "1.05em",
    backgroundColor: "rgba(255,255,255,0.9)",
    display: "flex",
    gap: "1em",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-around",
  };
  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  return (
    <section className="flex justify-center items-stretch content-center  w-9/12">
      <div>
        <Calendar
          fullscreen={true}
          style={wrapperStyle}
          onPanelChange={onPanelChange}
          value={value}
          onSelect={onSelect}
        />
      </div>
      <AppointmentList
        onSelect={onSelect}
        selectedValue={selectedValue}
        eventsByDate={eventsByDate}
      />
    </section>
  );
}

export default CalendarComponent;

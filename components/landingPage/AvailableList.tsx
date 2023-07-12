import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AvailableQueues from "./AvailableQueues";
import { AppointmentInput, UserData } from "../../types/types";
import { DatePicker } from "antd";

export default function AvailableListCalendar({
  userData,
  appointmentInput,
  setAppointmentInput,
}: {
  userData: UserData[];
  appointmentInput: AppointmentInput;
  setAppointmentInput: React.Dispatch<React.SetStateAction<AppointmentInput>>;
}) {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const handleDateChange = (event: Dayjs) => {
    setSelectedDate(event);
  };

  const handlePreviousDay = () => {
    setSelectedDate(selectedDate.subtract(1, "day"));
  };

  const handleNextDay = () => {
    setSelectedDate(selectedDate.add(1, "day"));
  };

  return (
    <div className="w-full">
      <button onClick={handlePreviousDay}>&lt;</button>

      <DatePicker
        presets={[
          { label: "Yesterday", value: dayjs().add(-1, "d") },
          { label: "Last Week", value: dayjs().add(-7, "d") },
          { label: "Last Month", value: dayjs().add(-1, "month") },
        ]}
        onChange={(newDate) => newDate && handleDateChange(newDate)}
        value={selectedDate}
        className="w-full cursor-pointer p-5"
      />
      <button onClick={handleNextDay}>&gt;</button>
      <AvailableQueues
        date={selectedDate}
        userData={userData}
        appointmentInput={appointmentInput}
        setAppointmentInput={setAppointmentInput}
      />
    </div>
  );
}

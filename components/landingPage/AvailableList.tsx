import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AvailableQueues from "./AvailableQueues";
import { AppointmentInput, UserData } from "../../types/types";

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
    <div>
      <button onClick={handlePreviousDay}>&lt;</button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={selectedDate}
          onChange={(newDate) => newDate && handleDateChange(newDate)}
        />
      </LocalizationProvider>
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

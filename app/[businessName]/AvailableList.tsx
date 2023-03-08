import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField, TextFieldProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AvailableSlot, Treatment, User } from "@prisma/client";

export default function AvailableListCalendar({
  user,
}: {
  user: User & {
    Treatment: Treatment[];
    availableSlots: AvailableSlot[];
  };
}) {
  console.log(user);

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
          renderInput={(props) => <TextField {...props} type="text" />}
        />
      </LocalizationProvider>
      <button onClick={handleNextDay}>&gt;</button>
      <AvailableQueues date={selectedDate} />
    </div>
  );
}

function AvailableQueues({ date }: { date: Dayjs }) {
  function handleDateSelected(date: Dayjs) {
    console.log(`Selected date: ${date.format("YYYY-MM-DD")}`);
  }

  return (
    <div>
      <h1>Select a date: {date.format("YYYY-MM-DD")}</h1>
    </div>
  );
}

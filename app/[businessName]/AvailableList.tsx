import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Button, TextField, TextFieldProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AvailableSlot } from "@prisma/client";
import { UserData } from "../../types";
import { Poppins } from "@next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function AvailableListCalendar({
  userData,
}: {
  userData: UserData;
}) {
  console.log(userData.user?.availableSlots);

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
      <AvailableQueues date={selectedDate} userData={userData} />
    </div>
  );
}

function AvailableQueues({
  date,
  userData,
}: {
  date: Dayjs;
  userData: UserData;
}) {
  const [availableSlot, setAvailableSlot] =
    React.useState<AvailableSlot | null>(null);
  console.log(userData.appointmentSlots);

  const handleChange = (item: AvailableSlot) => {
    console.log(item);

    setAvailableSlot(item);
  };

  return (
    <div className="py-12 gap-2 flex justify-start align-center items-center flex-wrap align-center items-center">
      {userData?.appointmentSlots.map((item) => (
        <button
          key={item.id}
          onClick={() => handleChange(item)}
          className={`${
            font.className
          } px-4 py-2  border-2 transition-all border-black ease-in-out duration-300 hover:bg-orange-500 font-medium ${
            availableSlot?.id == item?.id
              ? `bg-orange-500  text-lg`
              : `bg-rose-100 text-base  `
          } hover:text-lg   text-black rounded-xl`}
        >
          {item?.start}
        </button>
      ))}
    </div>
  );
}

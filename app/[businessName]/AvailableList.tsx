import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AvailableSlot } from "@prisma/client";
import { AppointmentInput, UserData } from "../../types";
import { Poppins } from "@next/font/google";
import axios from "axios";

const font = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function AvailableListCalendar({
  userData,
  appointmentInput,
  setAppointmentInput,
}: {
  userData: UserData;
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
          renderInput={(props) => <TextField {...props} type="text" />}
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

function AvailableQueues({
  date,
  userData,
  appointmentInput,
  setAppointmentInput,
}: {
  date: Dayjs;
  userData: UserData;
  appointmentInput: AppointmentInput;
  setAppointmentInput: React.Dispatch<React.SetStateAction<AppointmentInput>>;
}) {
  const [queues, setQueues] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log(date.format());

    const getQueues = async (date: Dayjs) => {
      try {
        let res = await axios.get(
          `/api/slots/slot?chosenDate=${date}&userId=${userData.userId}&duration=${appointmentInput?.treatment?.duration}`
        );
        console.log(res.data);

        setQueues(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    setAppointmentInput({ ...appointmentInput, date });

    getQueues(date);
  }, [date]);

  const handleChange = (availableSlot: AvailableSlot[]) => {
    setAppointmentInput({ ...appointmentInput, availableSlot });
  };

  return (
    <div className="py-12 gap-2 flex justify-start align-center items-center flex-wrap align-center">
      {queues?.map((item) => {
        return (
          <button
            key={item[0].id}
            onClick={() => handleChange(item)}
            className={`${
              font.className
            } px-4 py-2  border-2 transition-all border-black ease-in-out duration-300 hover:bg-orange-500 font-medium ${
              appointmentInput?.availableSlot[0]?.id == item[0]?.id
                ? `bg-orange-500 text-lg`
                : `bg-rose-100 text-base`
            } hover:text-lg   text-black rounded-xl`}
          >
            {item[0]?.start} - {item[item.length - 1]?.end}
          </button>
        );
      })}
    </div>
  );
}

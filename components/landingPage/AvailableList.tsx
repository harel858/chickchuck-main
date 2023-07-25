import React, { useCallback, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import AvailableQueues from "./AvailableQueues";
import { ActivityDay, AppointmentInput, UserData } from "../../types/types";
import { DatePicker } from "antd";
import { Zoom } from "react-awesome-reveal";
import { Button } from "@ui/Button";

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
  // Function to get the days of the current week
  const getDaysOfCurrentWeek = useCallback((currentDate: Dayjs): Dayjs[] => {
    const startOfWeek = currentDate.startOf("week");
    const endOfWeek = currentDate.endOf("week");
    const days: Dayjs[] = [];

    let currentDay = startOfWeek;
    while (currentDay.isSame(endOfWeek) || currentDay.isBefore(endOfWeek)) {
      days.push(currentDay);
      currentDay = currentDay.add(1, "day");
    }

    return days;
  }, []);

  const daysOfCurrentWeek = getDaysOfCurrentWeek(selectedDate);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <Zoom damping={1000} duration={350} className="w-full">
        <div className="w-full flex justify-center items-center gap-3">
          <button onClick={handlePreviousDay}>&lt;</button>
          <DatePicker
            presets={[
              { label: "Yesterday", value: dayjs().add(-1, "d") },
              { label: "Last Week", value: dayjs().add(-7, "d") },
              { label: "Last Month", value: dayjs().add(-1, "month") },
            ]}
            onChange={(newDate) => newDate && handleDateChange(newDate)}
            value={selectedDate}
            className="w-1/2 cursor-pointer p-5"
          />
          <button onClick={handleNextDay}>&gt;</button>
        </div>
      </Zoom>
      <div className="flex flex-row justify-center items-center gap-1 w-11/12">
        {daysOfCurrentWeek.map((day, i) => {
          return (
            <Button
              key={i}
              variant={"default"}
              onClick={() => handleDateChange(day)}
              className="flex flex-col justify-center items-center gap-2 px-1 py-7 bg-slate-900 text-white border border-slate-100 hover:text-white"
            >
              <p className="text-base font-semibold">
                {day.format("dddd").slice(0, 3)}
              </p>
              <p>{day.format("MM/DD")}</p>
            </Button>
          );
        })}
      </div>
      <AvailableQueues
        date={selectedDate}
        userData={userData}
        appointmentInput={appointmentInput}
        setAppointmentInput={setAppointmentInput}
      />
    </div>
  );
}

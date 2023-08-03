import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import dayjs, { Dayjs } from "dayjs";
import AvailableQueues from "./AvailableQueues";
import { AppointmentInput, UserData } from "../../types/types";
import { DatePicker } from "antd";
import { Zoom } from "react-awesome-reveal";
import { Button } from "@ui/Button";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const scaleSpringTransition = {
  type: "spring",
  stiffness: 750,
  damping: 10,
  duration: 0.3,
};

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
    <div className="w-full flex flex-col justify-start items-center gap-4">
      <Zoom damping={1000} duration={350} className="w-full">
        <div className="w-full flex justify-center items-center gap-3">
          <motion.div
            key="arrowLeft"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={scaleSpringTransition}
          >
            <BsArrowLeftCircle
              className="text-4xl text-black rounded-full hover:bg-white/70 cursor-pointer"
              onClick={handlePreviousDay}
            />
          </motion.div>
          <DatePicker
            presets={[
              { label: "Tomorrow", value: dayjs().add(1, "d") },
              { label: "Next Week", value: dayjs().add(7, "d") },
              { label: "Next Month", value: dayjs().add(1, "month") },
            ]}
            onChange={(newDate) => newDate && handleDateChange(newDate)}
            value={selectedDate}
            className="w-1/2 cursor-pointer"
          />
          <motion.div
            key="arrowRight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={scaleSpringTransition}
          >
            <BsArrowRightCircle
              className="text-4xl text-black rounded-full hover:bg-white/70 cursor-pointer"
              onClick={handleNextDay}
            />
          </motion.div>
        </div>
      </Zoom>
      <div className="flex flex-row justify-center items-center gap-1 w-11/12">
        {daysOfCurrentWeek.map((day, i) => {
          return (
            <Button
              key={i}
              variant={"ghost"}
              onClick={() => handleDateChange(day)}
              className={`${
                selectedDate.format("DD/MM/YYYY") == day.format("DD/MM/YYYY")
                  ? "bg-slate-900 text-white"
                  : "bg-orange-200 text-black"
              } flex flex-col justify-center items-center gap-1 px-1 py-7 border border-gray-500 hover:text-white hover:bg-slate-900`}
            >
              <p className="text-base font-medium font-sans">
                {day.format("dddd").slice(0, 1)}`
              </p>
              <p className="text-xs font-normal font-sans text-gray-500">
                {day.format("MM/DD")}
              </p>
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

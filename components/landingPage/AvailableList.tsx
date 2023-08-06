import { useCallback, useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import AvailableQueues from "./AvailableQueues";
import { DatePicker } from "antd";
import { Zoom } from "react-awesome-reveal";
import { Button } from "@ui/Button";
import LeftArrow from "@components/arrows/LeftArrow";
import RightArrow from "@components/arrows/RightArrow";
import { AppointmentInput, BusinessData, UserData } from "../../types/types";

export default function AvailableListCalendar({
  businessData,
  appointmentInput,
  setAppointmentInput,
  setRecipientMissing,
  setTreatmentMissing,
}: {
  businessData: BusinessData;
  appointmentInput: AppointmentInput;
  setAppointmentInput: React.Dispatch<React.SetStateAction<AppointmentInput>>;
  setTreatmentMissing: React.Dispatch<React.SetStateAction<string>>;
  setRecipientMissing: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const isInit = useRef(true);
  useEffect(() => {
    console.log(isInit);

    if (isInit.current) {
      isInit.current = false;
      return;
    }
    // Reset missing fields state
    setTreatmentMissing("");
    setRecipientMissing("");

    // Check for missing fields
    if (!appointmentInput.treatment) setTreatmentMissing("Service is missing");
    if (!appointmentInput.user) setRecipientMissing("Recipient is missing");
  }, [selectedDate]);
  const handleDateChange = (event: Dayjs) => {
    setSelectedDate(event);
  };

  const handlePreviousDay = useCallback(() => {
    if (selectedDate.subtract(1, "day").isBefore(dayjs(), "day")) return;
    setSelectedDate(selectedDate.subtract(1, "day"));
  }, [selectedDate]);

  const handleNextDay = useCallback(() => {
    setSelectedDate(selectedDate.add(1, "day"));
  }, [selectedDate]);

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
          <LeftArrow onClickHandler={handlePreviousDay} />
          <DatePicker
            disabledDate={(current) =>
              current && current.isBefore(dayjs(), "day")
            }
            presets={[
              { label: "Tomorrow", value: dayjs().add(1, "d") },
              { label: "Next Week", value: dayjs().add(7, "d") },
              { label: "Next Month", value: dayjs().add(1, "month") },
            ]}
            onChange={(newDate) => newDate && handleDateChange(newDate)}
            value={selectedDate}
            className="w-52 cursor-pointer"
          />
          <RightArrow onClickHandler={handleNextDay} />
        </div>
      </Zoom>
      <div className="flex flex-row justify-center items-center gap-1 w-11/12">
        {daysOfCurrentWeek.map((day, i) => {
          const validDay = businessData?.business.activityDays.some(
            (item) => item == day.day()
          );
          const pastDay = day.isBefore(dayjs(), "day");
          return (
            <Button
              key={i}
              variant={"ghost"}
              onClick={() => handleDateChange(day)}
              disabled={pastDay || !validDay}
              className={`${
                selectedDate.format("DD/MM/YYYY") == day.format("DD/MM/YYYY")
                  ? "bg-slate-900 text-white"
                  : pastDay
                  ? "bg-orange-200 text-black opacity-80"
                  : "bg-orange-200 text-black"
              } flex flex-col justify-center items-center gap-1 px-1 py-7 border border-gray-500 hover:text-white hover:bg-slate-900`}
            >
              <p className="text-base font-medium font-sans">
                {day.format("dddd").slice(0, 1)}`
              </p>
              {!validDay ? (
                <p>Close</p>
              ) : (
                <p className="text-xs font-normal font-sans text-gray-500">
                  {day.format("MM/DD")}
                </p>
              )}
            </Button>
          );
        })}
      </div>
      <AvailableQueues
        date={selectedDate}
        userData={businessData.usersData}
        appointmentInput={appointmentInput}
        setAppointmentInput={setAppointmentInput}
      />
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Button } from "@ui/Button";
import LeftArrow from "@components/arrows/LeftArrow";
import RightArrow from "@components/arrows/RightArrow";
import AvailableQueues from "@components/landingPage/AvailableQueues";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { AppointmentInput, UserData } from "types/types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function AvailableList({
  usersData,
  businessActivityDays,
  appointmentInput,
  setAppointmentInput,
  setRecipientMissing,
  setTreatmentMissing,
  setCustomerMissing,
}: {
  usersData: UserData[];
  businessActivityDays: number[];
  appointmentInput: AppointmentInput;
  setAppointmentInput: React.Dispatch<React.SetStateAction<AppointmentInput>>;
  setTreatmentMissing: React.Dispatch<React.SetStateAction<string>>;
  setRecipientMissing: React.Dispatch<React.SetStateAction<string>>;
  setCustomerMissing: React.Dispatch<React.SetStateAction<string>>;
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
    setCustomerMissing("");

    // Check for missing fields
    if (!appointmentInput.customerId) setCustomerMissing("Client is missing");
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

  console.log("appointmentInput", appointmentInput);

  return (
    <div
      className="w-full flex flex-col justify-start items-center"
      onClick={() => {
        if (!appointmentInput.customerId)
          setCustomerMissing("Client is missing");
        if (!appointmentInput.treatment)
          setTreatmentMissing("Service is missing");
        if (!appointmentInput.user) setRecipientMissing("Recipient is missing");
      }}
    >
      <div className="w-full flex justify-center items-center gap-3">
        <LeftArrow
          disabled={
            !appointmentInput.customerId ||
            !appointmentInput.treatment?.id ||
            !appointmentInput.user?.userId
          }
          onClickHandler={handlePreviousDay}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            shouldDisableDate={(date) => date.isBefore(dayjs(), "day")}
            onChange={(newDate) => newDate && handleDateChange(newDate)}
            value={selectedDate}
            closeOnSelect
            className="w-52 cursor-pointer"
            sx={{ width: 180, minWidth: 120 }}
            disabled={
              !appointmentInput.customerId ||
              !appointmentInput.treatment ||
              !appointmentInput.user
            }
          />
        </LocalizationProvider>
        <RightArrow
          disabled={
            !appointmentInput.customerId ||
            !appointmentInput.treatment?.id ||
            !appointmentInput.user?.userId
          }
          onClickHandler={handleNextDay}
        />
      </div>
      <div className="flex flex-row justify-center items-center gap-1 w-11/12">
        {daysOfCurrentWeek.map((day, i) => {
          let validDay = false;
          if (usersData.length <= 1)
            validDay = businessActivityDays.some((item) => item == day.day());

          if (usersData.length > 1 && appointmentInput.user)
            validDay = appointmentInput.user?.activityDays.some(
              (item) => item == day.day()
            );
          const pastDay = day.isBefore(dayjs(), "day");
          return (
            <Button
              key={i}
              variant={"ghost"}
              onClick={() => handleDateChange(day)}
              disabled={
                pastDay ||
                !validDay ||
                !appointmentInput.customerId ||
                !appointmentInput.treatment ||
                !appointmentInput.user
              }
              className={`${
                selectedDate.format("DD/MM/YYYY") == day.format("DD/MM/YYYY")
                  ? "bg-slate-900 text-white"
                  : pastDay
                  ? "bg-orange-200 text-black opacity-80"
                  : "bg-orange-200 text-black"
              } flex flex-col justify-center items-center gap-1 px-1 py-5 border border-gray-500 hover:text-white hover:bg-slate-900`}
            >
              <p className="text-sm font-medium font-sans">
                {day.format("dddd").slice(0, 2)}`
              </p>
              {!validDay ? (
                <p className="text-xs font-normal font-sans text-gray-500">
                  Close
                </p>
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
        businessActivityDays={businessActivityDays}
        usersData={usersData}
        date={selectedDate}
        appointmentInput={appointmentInput}
        setAppointmentInput={setAppointmentInput}
      />
    </div>
  );
}

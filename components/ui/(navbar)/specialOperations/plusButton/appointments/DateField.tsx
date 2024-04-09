import { TAppointmentValidation } from "@lib/validators/AppointmentValidation";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { Session } from "next-auth";
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import { FieldType } from "../FormField";
import DateCalendar from "./DateCalendar";
import Slots from "./Slots";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Account,
  ActivityDays,
  Customer,
  Treatment,
  User,
} from "@prisma/client";
dayjs.extend(customParseFormat);

const DateField = ({
  session,
  getValues,
  control,
  errors,
  label,
  name,
  register,
  user,
}: {
  getValues: UseFormGetValues<TAppointmentValidation>;
  label: FieldType["label"];
  control: Control<TAppointmentValidation>;
  name: FieldType["name"];
  register: UseFormRegister<TAppointmentValidation>;
  errors: FieldErrors<TAppointmentValidation>;
  session: Session;
  user: User & {
    accounts: Account[];
    Treatment: Treatment[];
    activityDays: ActivityDays[];
    Customer: Customer[];
  };
}) => {
  const data = getValues();
  const [slots, setSlots] = useState<{ start: string; end: string }[]>([]);
  const [slotsByDay, setSlotsByDay] = useState<
    { start: string; end: string }[]
  >([]);
  const [busySlots, setBusySlots] = useState<{ start: string; end: string }[]>(
    []
  );
  const fetchSlots = async (date?: string) => {
    try {
      const startOfMonth = dayjs(date).startOf("month").toISOString();
      const endOfMonth = dayjs(date).endOf("month").toISOString();

      const res = await fetch(
        "https://www.googleapis.com/calendar/v3/freeBusy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.access_token}`,
          },
          body: JSON.stringify({
            timeMin: startOfMonth,
            timeMax: endOfMonth,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            groupExpansionMax: 1,
            calendarExpansionMax: 50,
            items: [{ id: "primary" }],
          }),
        }
      );

      const result: any = await res.json();
      console.log("freebusy", result);

      if (res.status === 200) {
        const treatment = user.Treatment.find(
          (item) => item.id === data.Service.value
        );
        const durationInMinutes = treatment?.duration || 0;
        const busy = result?.calendars?.primary?.busy || [];
        setBusySlots(busy);
        const isoDate = dayjs().toISOString();
        const generatedSlots = getAvailableTimeSlots(isoDate);
        setSlots(generatedSlots);
        const newSlots = getSlotsByDay(dayjs(), generatedSlots);
        setSlotsByDay(newSlots);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const getAvailableTimeSlots = useCallback((month: string) => {
    const availableSlots = [];
    const startOfMonth = dayjs(month).startOf("month");
    const endOfMonth = dayjs(month).endOf("month");
    let currentSlotStart = startOfMonth;
    const startTime = user.activityDays[currentSlotStart.day()]?.start;
    const endTime = user.activityDays[currentSlotStart.day()]?.end;
    while (currentSlotStart.isBefore(endOfMonth)) {
      const currentSlotEnd = currentSlotStart.add(5, "minutes");

      const isValidStartTime = dayjs(
        currentSlotEnd.format("HH:mm"),
        "HH:mm"
      ).isAfter(dayjs(startTime, "HH:mm"));

      const isValidEndTime = dayjs(
        currentSlotStart.format("HHLmm"),
        "HH:mm"
      ).isBefore(dayjs(endTime, "HH:mm"));

      if (isValidStartTime && isValidEndTime) {
        availableSlots.push({
          start: currentSlotStart.toISOString(),
          end: currentSlotEnd.toISOString(),
        });
      }

      currentSlotStart = currentSlotStart.add(5, "minutes");
    }
    console.log("availableSlots", availableSlots);

    return availableSlots;
  }, []);

  const getSlotsByDay = useCallback(
    (selectedDate: Dayjs, allSlots: { start: string; end: string }[]) => {
      console.log("what day is picked?", user.activityDays[selectedDate.day()]);

      if (
        allSlots.length <= 0 ||
        !user.activityDays[selectedDate.day()]?.isActive
      )
        return [];

      const day = user.activityDays.find(
        (item) => item.day === dayjs(selectedDate).day()
      );

      const res = allSlots.filter((item) => {
        const isSameDay = dayjs(item.start).isSame(selectedDate, "day");
        return isSameDay;
      });

      const availableSlots = [];
      const treatment = user.Treatment.find(
        (item) => item.id === data.Service.value
      );
      const durationInMinutes = treatment?.duration || 0;

      let currentSlotStart = dayjs(res[0]?.start);
      let currentSlotEnd = currentSlotStart.add(durationInMinutes, "minutes");

      while (
        currentSlotStart &&
        dayjs(currentSlotStart.format("HH:mm"), "HH:mm").isBefore(
          dayjs(day?.end, "HH:mm")
        )
      ) {
        currentSlotEnd = currentSlotStart.add(durationInMinutes, "minutes");

        // Check if the current slot's end time is in the future
        if (dayjs(currentSlotEnd).isAfter(dayjs())) {
          const isSlotAvailable = busySlots.every((busySlot) => {
            const busyStart = dayjs(busySlot.start);
            const busyEnd = dayjs(busySlot.end);
            return (
              currentSlotEnd.isBefore(busyStart) ||
              currentSlotEnd.isSame(busyStart) ||
              currentSlotStart.isAfter(busyEnd) ||
              currentSlotStart.isSame(busyEnd)
            );
          });

          if (
            (isSlotAvailable &&
              dayjs(currentSlotEnd.format("HH:mm"), "HH:mm").isBefore(
                dayjs(day?.end, "HH:mm")
              )) ||
            dayjs(currentSlotEnd.format("HH:mm"), "HH:mm").isSame(
              dayjs(day?.end, "HH:mm")
            )
          )
            availableSlots.push({
              start: currentSlotStart.toISOString(),
              end: currentSlotEnd.toISOString(),
            });
        }

        currentSlotStart = currentSlotStart.add(durationInMinutes, "minutes");
      }

      setSlotsByDay(availableSlots);
      return availableSlots;
    },
    [slotsByDay]
  );

  return (
    <div className="w-full flex flex-col justify-center items-center gap-7">
      <DateCalendar
        user={user}
        control={control}
        data={data}
        errors={errors}
        getAvailableTimeSlots={getAvailableTimeSlots}
        getSlotsByDay={getSlotsByDay}
        name={name}
        session={session}
        setSlots={setSlots}
        setSlotsByDay={setSlotsByDay}
        slots={slots}
      />
      <Slots
        control={control}
        errors={errors}
        slotsByDay={slotsByDay}
        session={session}
        getValues={getValues}
      />
    </div>
  );
};

export default DateField;

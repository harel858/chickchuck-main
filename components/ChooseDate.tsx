import { useEffect, useCallback, useRef, useState, useMemo } from "react";
import { Calendar, Spin } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { calendar_v3 } from "googleapis";
import { fetchEventsByDate } from "actions/getSlots";
import { ActivityDays, Treatment } from "@prisma/client";
import he from "dayjs/locale/he";
import { hebrewClendar } from "@ui/calendar/utils/hebCalendar";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.locale(he);

const ChooseDate = ({
  onSelectedDate,
  selectedDate,
  activityDays,
  freeBusy,
  selectedService,
  onSlots,
  onSlotsForMonth,
  slotsForMonth,
  calendarId,
}: {
  onSelectedDate: (date: Dayjs) => void;
  selectedDate: dayjs.Dayjs;
  activityDays: ActivityDays[];
  freeBusy: string;
  selectedService: Treatment | null;
  onSlots: (slots: calendar_v3.Schema$TimePeriod[]) => void;
  allSlots: calendar_v3.Schema$TimePeriod[];
  onSlotsForMonth: (
    slots: Record<string, calendar_v3.Schema$TimePeriod[]>
  ) => void;
  slotsForMonth: Record<string, calendar_v3.Schema$TimePeriod[]> | null;
  calendarId: string;
}) => {
  console.log("activityDays", activityDays);

  const [loading, isLoading] = useState(true);
  const prevSelectedDate = useRef<Dayjs | null>(null);
  useEffect(() => {
    const fetchEventsForMonth = async (date: Dayjs) => {
      try {
        const response = await fetchEventsByDate(
          date.toISOString(),
          freeBusy,
          calendarId
        );

        const res = response?.calendars?.primary?.busy;
        const isoDate = selectedDate.toISOString();
        const generatedSlots = getAvailableTimeSlots(isoDate);
        onSlots(generatedSlots);
        const newSlotsForMonth = getSlotsForMonth(
          selectedDate,
          generatedSlots,
          res || []
        );

        onSlotsForMonth(newSlotsForMonth);
      } catch (err: any) {
        console.log(err);
      }
    };

    // Check if prevSelectedDate is different from the current selectedDate
    if (
      prevSelectedDate.current?.format("MMMM, YYYY") !==
      selectedDate.format("MMMM, YYYY")
    ) {
      fetchEventsForMonth(selectedDate);
    }
    prevSelectedDate.current = selectedDate;
  }, [selectedDate]);

  const getAvailableTimeSlots = useMemo(
    () => (month: string) => {
      console.count();

      const availableSlots: calendar_v3.Schema$TimePeriod[] = [];
      const startOfMonth = dayjs(month).startOf("month");
      const endOfMonth = dayjs(month).endOf("month");
      let currentSlotStart = startOfMonth;

      while (currentSlotStart.isBefore(endOfMonth)) {
        const startTime = activityDays[currentSlotStart.day()]?.start;
        const endTime = activityDays[currentSlotStart.day()]?.end;

        const currentSlotEnd = currentSlotStart.add(5, "minutes");

        const isValidStartTime = dayjs(
          currentSlotEnd.format("HH:mm"),
          "HH:mm"
        ).isAfter(dayjs(startTime, "HH:mm"));

        const isValidEndTime = dayjs(
          currentSlotStart.format("HH:mm"),
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

      return availableSlots;
    },
    [selectedDate]
  );
  const getSlotsByDay = useMemo(
    () =>
      (
        selectedDate: Dayjs,
        allSlots: calendar_v3.Schema$TimePeriod[],
        busySlots: calendar_v3.Schema$TimePeriod[]
      ) => {
        if (allSlots.length <= 0 || !activityDays[selectedDate.day()]?.isActive)
          return [];

        const day = activityDays.find(
          (item) => item.day === dayjs(selectedDate).day()
        );

        const res = allSlots.filter((item) => {
          const isSameDay = dayjs(item.start).isSame(selectedDate, "day");
          return isSameDay;
        });

        const availableSlots = [];

        const durationInMinutes = selectedService?.duration || 0;

        let currentSlotStart = dayjs(res[0]?.start);
        let currentSlotEnd = currentSlotStart.add(durationInMinutes, "minutes");
        console.log("selectedDate", selectedDate.format("DD/MM/YYYY"));

        if (day?.isActive === true)
          while (
            day &&
            currentSlotStart &&
            currentSlotStart.isSame(selectedDate, "day") &&
            currentSlotStart.format("HH:mm") < day?.end
          ) {
            console.log("currentSlotStart", currentSlotStart.format("HH:mm"));
            console.log("day?.end", day?.end);

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
                isSlotAvailable &&
                currentSlotEnd.format("HH:mm") <= day?.end
              ) {
                availableSlots.push({
                  start: currentSlotStart.toISOString(),
                  end: currentSlotEnd.toISOString(),
                });
              }
            }

            currentSlotStart = currentSlotStart.add(
              durationInMinutes,
              "minutes"
            );
          }

        return availableSlots;
      },
    [selectedDate]
  );

  const getSlotsForMonth = useMemo(
    () =>
      (
        selectedDate: Dayjs,
        allSlots: calendar_v3.Schema$TimePeriod[],
        busySlots: calendar_v3.Schema$TimePeriod[]
      ) => {
        isLoading(true);
        const slotsForMonth: Record<string, calendar_v3.Schema$TimePeriod[]> =
          {};
        const startOfMonth = selectedDate.startOf("month");
        const endOfMonth = selectedDate.endOf("month");

        let currentDate = startOfMonth;

        while (
          currentDate.isBefore(endOfMonth, "day") ||
          currentDate.isSame(endOfMonth, "day")
        ) {
          const formattedDate = currentDate.format("DD/MM/YYYY");

          slotsForMonth[formattedDate] = getSlotsByDay(
            currentDate,
            allSlots,
            busySlots
          );
          currentDate = currentDate.add(1, "day");
        }
        isLoading(false);
        return slotsForMonth;
      },
    [selectedDate, getSlotsByDay]
  );

  const disabledDate = (current: Dayjs) => {
    const currentDay = current.day();
    const isActivityDay = activityDays.some(
      (day) => day.day === currentDay && day.isActive
    );
    if (!isActivityDay) return true; // If the day is not active, disable it

    const daySlots = slotsForMonth?.[current.format("DD/MM/YYYY")];

    if (daySlots?.length === 0) return true; // If no slots found for this day, disable it

    return false; // Enable the date
  };
  return (
    <div className="flex justify-center items-center">
      {loading ? (
        <Spin spinning size="large" />
      ) : (
        <Calendar
          locale={hebrewClendar}
          defaultValue={selectedDate}
          fullscreen={false}
          disabledDate={disabledDate}
          onSelect={onSelectedDate}
          value={selectedDate}
          style={{ direction: "rtl" }} // Set direction to RTL
        />
      )}
    </div>
  );
};

export default ChooseDate;

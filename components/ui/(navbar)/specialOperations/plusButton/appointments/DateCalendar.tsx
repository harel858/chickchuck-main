import { TAppointmentValidation } from "@lib/validators/AppointmentValidation";
import {
  Account,
  ActivityDays,
  Customer,
  Treatment,
  User,
} from "@prisma/client";
import { FormDescription, FormField, FormItem, FormMessage } from "@ui/form";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Session } from "next-auth";
import React, { Dispatch, SetStateAction } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { FieldType } from "../FormField";

type DatePickerProps = {
  setSlots: Dispatch<
    SetStateAction<
      {
        start: string;
        end: string;
      }[]
    >
  >;
  getSlotsByDay: (
    selectedDate: Dayjs,
    allSlots: {
      start: string;
      end: string;
    }[]
  ) => {
    start: string;
    end: string;
  }[];
  setSlotsByDay: Dispatch<
    SetStateAction<
      {
        start: string;
        end: string;
      }[]
    >
  >;
  data: TAppointmentValidation;
  slots: {
    start: string;
    end: string;
  }[];
  getAvailableTimeSlots: (month: string) => {
    start: string;
    end: string;
  }[];
  control: Control<TAppointmentValidation>;
  name: FieldType["name"];

  errors: FieldErrors<TAppointmentValidation>;
  session: Session;
  user: User & {
    accounts: Account[];
    Treatment: Treatment[];
    activityDays: ActivityDays[];
    Customer: Customer[];
  };
};

function DateCalendar({
  user,
  control,
  errors,
  getSlotsByDay,
  setSlotsByDay,
  session,
  getAvailableTimeSlots,
  setSlots,
  data,
  slots,
}: DatePickerProps) {
  const onSelect = async (
    data: TAppointmentValidation,
    selectedDate: Dayjs,
    onChange: (...event: any[]) => void
  ) => {
    console.log("data", data);

    const sameMonth = selectedDate.month() === dayjs(data.Date).month();
    const sameYear = selectedDate.year() === dayjs(data.Date).year();
    onChange(selectedDate.toISOString());
    console.count("selected");
    if (sameMonth && sameYear) {
      const newSlots = getSlotsByDay(selectedDate, slots);
      console.log("newSlots", newSlots);
      setSlotsByDay(newSlots);
      return onChange(selectedDate.toISOString());
    }
    try {
      const startOfMonth = dayjs(selectedDate).startOf("month").toISOString();
      const endOfMonth = dayjs(selectedDate).endOf("month").toISOString();
      console.log("startOfMonth", dayjs(startOfMonth).format("DD/MM/YYYY"));
      console.log("startOfMonth", dayjs(endOfMonth).format("DD/MM/YYYY"));

      const res = await fetch(
        "https://www.googleapis.com/calendar/v3/freeBusy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + `${session.user.access_token}`,
          },
          body: JSON.stringify({
            timeMin: startOfMonth,
            timeMax: endOfMonth, // Assuming one hour slot
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Set your time zone
            groupExpansionMax: 1,
            calendarExpansionMax: 50,
            items: [
              {
                id: "primary",
              },
            ],
          }),
        }
      );

      const result = (await res.json()) as any;
      console.log("result", result);
      if (res.status === 200) {
        const treatment = user.Treatment.find(
          (item) => item.id === data.Service.value
        );

        console.log("treatment", treatment?.duration);

        const durationInMinutes = treatment?.duration || 0;
        const busy = result?.calendars?.primary?.busy;
        console.log("busy", busy);
        const isoDate = dayjs(selectedDate).toISOString();
        const generatedSlots = getAvailableTimeSlots(isoDate);

        console.log("generatedSlots", generatedSlots);

        setSlots(generatedSlots);
        const newSlots = getSlotsByDay(selectedDate, generatedSlots);
        console.log("newSlots", newSlots);
        setSlotsByDay(newSlots);
        return onChange(selectedDate.toISOString());
      }
    } catch (err: any) {
      console.log(typeof err);
      console.log("err", err);
    }
  };

  return (
    <FormField
      control={control}
      name={"Date"}
      render={({ field }) => (
        <FormItem style={{ width: "15rem", zIndex: 50 }}>
          <DatePicker
            defaultValue={dayjs()}
            value={dayjs(field.value)}
            onChange={(selectedDate) =>
              selectedDate && onSelect(data, selectedDate, field.onChange)
            }
          />
          {errors?.["Date"] && (
            <p className="text-sm text-red-500">{errors["Date"]?.message}</p>
          )}
          <FormDescription></FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default DateCalendar;

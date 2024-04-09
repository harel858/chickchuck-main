import React from "react";
import dayjs from "dayjs";
import { Button } from "@ui/Button";
import { FormField, FormItem, FormMessage } from "@ui/form";
import { Control, FieldErrors, UseFormGetValues } from "react-hook-form";
import { TAppointmentValidation } from "@lib/validators/AppointmentValidation";
import { motion } from "framer-motion";
import { FaRegCalendarTimes } from "react-icons/fa";
import { Session } from "next-auth";

interface SlotProps {
  start: string;
  end: string;
}

interface SlotsProps {
  slotsByDay: SlotProps[];
  errors: FieldErrors<TAppointmentValidation>;
  session: Session;
  control: Control<TAppointmentValidation>;
  getValues: UseFormGetValues<TAppointmentValidation>;
}

function Slots({
  slotsByDay,
  errors,
  getValues,
  control,
  session,
}: SlotsProps) {
  const selectedSlot = getValues().slot;

  const isPastDate = dayjs().isAfter(dayjs(getValues().Date));
  const isToday = dayjs().isSame(dayjs(getValues().Date), "date");

  return (
    <div className="w-full max-h-44 p-2 overflow-hidden flex flex-wrap justify-around items-center gap-1">
      {isPastDate && !isToday ? (
        <>black bimo</>
      ) : slotsByDay.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className="text-lg flex flex-col justify-center items-center over">
            <h1 className="text-black max-w-xl">No free appointments found.</h1>
            <FaRegCalendarTimes className="text-4xl text-black" />
          </div>
        </motion.div>
      ) : (
        slotsByDay.map((slot) => {
          const start = dayjs(slot.start).format("HH:mm");
          const end = dayjs(slot.end).format("HH:mm");

          const isSlotSelected =
            selectedSlot?.start === slot.start &&
            selectedSlot?.end === slot.end;

          return (
            <FormField
              key={`${start}-${end}`}
              control={control}
              name={"slot"}
              render={({ field }) => (
                <FormItem>
                  <Button
                    key={`${start}-${end}`}
                    variant={"default"}
                    className={`${
                      isSlotSelected
                        ? "bg-orange-200 text-black"
                        : "bg-orange-50 text-black"
                    } w-max hover:bg-orange-200 rounded-lg border border-black/50`}
                    onClick={() => field.onChange(slot)}
                    type={"button"}
                  >
                    {start} - {end}
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })
      )}
    </div>
  );
}

export default Slots;

import React from "react";
import dayjs from "dayjs";
import { Button } from "@ui/Button";
import { FormDescription, FormField, FormItem, FormMessage } from "@ui/form";
import { Control, FieldErrors } from "react-hook-form";
import { TAppointmentValidation } from "@lib/validators/AppointmentValidation";
import { motion } from "framer-motion";
import { FaRegCalendarTimes } from "react-icons/fa";
import { Session } from "next-auth";
interface SlotProps {
  start: string;
  end: string;
}

interface DataProps {
  value: string;
  label: string;
}

interface SlotsProps {
  slotsByDay: SlotProps[];
  errors: FieldErrors<TAppointmentValidation>;
  session: Session;
  control: Control<TAppointmentValidation>;
  data: {
    Service: DataProps;
    Client: DataProps;
    Date: string;
    slot: SlotProps;
  };
}

function Slots({ slotsByDay, errors, data, control, session }: SlotsProps) {
  const isPastDate = dayjs().isAfter(dayjs(data.Date));
  const isToday = dayjs().isSame(dayjs(data.Date), "date");
  console.log("dayjs(data.Date)", dayjs(data.Date).format("DD/MM/YYYY"));

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
            slot?.start === data?.slot?.start && slot?.end === data?.slot?.end;

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
                      isSlotSelected ? "bg-slate-700" : "bg-slate-950"
                    } w-max text-white hover:bg-slate-700 rounded-lg border border-black`}
                    onClick={() => field.onChange(slot)}
                    type={"button"}
                  >
                    {start} - {end}
                  </Button>
                  <FormDescription />
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

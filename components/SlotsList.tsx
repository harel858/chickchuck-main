import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { calendar_v3 } from "googleapis";
import { Button } from "@ui/Button";
import LargeHeading from "@ui/LargeHeading";

function SlotsList({
  selectedDate,
  slotsForMonth,
  onSelectedSlot,
  selectedSlot,
}: {
  slotsForMonth: Record<string, calendar_v3.Schema$TimePeriod[]> | null;
  selectedDate: dayjs.Dayjs;
  onSelectedSlot: (slot: calendar_v3.Schema$TimePeriod) => void;
  selectedSlot: calendar_v3.Schema$TimePeriod | null;
}) {
  const [slotsForDay, setSlotsForDay] = useState<
    calendar_v3.Schema$TimePeriod[]
  >([]);

  useEffect(() => {
    const formattedDate = selectedDate.format("DD/MM/YYYY");
    const slots = slotsForMonth?.[formattedDate] || [];
    setSlotsForDay(slots);
  }, [selectedDate, slotsForMonth]);

  console.log("slotsForDay", slotsForDay);

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="w-full flex justify-center items-center pt-2">
        <LargeHeading size={"sm"} className="text-center text-base">
          {selectedDate.format("MMMM D, YYYY")}
        </LargeHeading>
      </div>
      <div className="w-full h-52 overflow-y-scroll p-2 gap-5 flex flex-row flex-wrap items-center justify-center">
        {slotsForDay.map((slot) => {
          const { start, end } = slot;
          const formattedStart = dayjs(start).format("HH:mm");
          const formattedEnd = dayjs(end).format("HH:mm");
          const isSlotSelected =
            selectedSlot?.start === start && selectedSlot?.end === end;
          const buttonClass = isSlotSelected
            ? "bg-orange-200 text-black"
            : "bg-slate-950 text-white";

          return (
            <Button
              key={`${start}-${end}`}
              variant={"default"}
              className={`${buttonClass} w-max hover:bg-orange-200 hover:text-black rounded-lg border border-black/50`}
              onClick={() => onSelectedSlot(slot)}
              type={"button"}
            >
              {formattedStart}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default SlotsList;

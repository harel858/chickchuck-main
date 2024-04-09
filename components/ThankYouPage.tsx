import { Treatment } from "@prisma/client";
import dayjs from "dayjs";
import { calendar_v3 } from "googleapis";
import React from "react";

function ThankYouPage({
  selectedService,
  selectedSlot,
}: {
  selectedService: Treatment | null;
  selectedSlot: calendar_v3.Schema$TimePeriod | null;
}) {
  return (
    <div className="flex flex-col justify-center items-center p-5">
      <h1 className="text-2xl text-black">סיכום</h1>
      <p className="text-xl text-black text-center">
        נקבע התור ל{selectedService?.title} בתאריך{" "}
        {dayjs(selectedSlot?.start).format("DD/MM/YYYY")} בשעה{" "}
        {dayjs(selectedSlot?.start).format("HH:mm")}
      </p>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex flex-col justify-center items-center gap-2"></div>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;

import { Treatment, User } from "@prisma/client";
import dayjs from "dayjs";
import { calendar_v3 } from "googleapis";
import React from "react";

function ThankYouPage({
  selectedService,
  selectedSlot,
  selectedUser,
  confirmationNeeded,
}: {
  confirmationNeeded: boolean | null;
  selectedService: Treatment | null;
  selectedSlot: calendar_v3.Schema$TimePeriod | null;
  selectedUser: User;
}) {
  console.log("confirmationNeeded", confirmationNeeded);

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <h1 className="text-2xl text-black">סיכום</h1>
      {confirmationNeeded === false ? (
        <p className="text-xl text-black text-center">
          נקבע תור אצל {selectedUser.name} ל{selectedService?.title || ""}{" "}
          בתאריך {dayjs(selectedSlot?.start).format("DD/MM/YYYY")} בשעה{" "}
          {dayjs(selectedSlot?.start).format("HH:mm")}
        </p>
      ) : (
        <p className="text-xl text-black text-center">
          הפגישה ל{selectedService?.title || ""} אצל {selectedUser.name} בתאריך{" "}
          {dayjs(selectedSlot?.start).format("DD/MM/YYYY")} בשעה{" "}
          {dayjs(selectedSlot?.start).format("HH:mm")} נקלטה בהצלחה וממתינה
          לאישור ע"י בעל העסק.
        </p>
      )}
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex flex-col justify-center items-center gap-2"></div>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;

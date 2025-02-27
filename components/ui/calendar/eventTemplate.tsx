import React from "react";
import dayjs from "dayjs";

function eventTemplate(props: any) {
  const getTimeString = (value: any) => {
    return dayjs(value).format("HH:mm a"); // 24 שעות (ל-AM/PM השתמש ב "h:mm A")
  };

  return (
    <div
      className="p-2 w-full text-white rounded flex flex-col justify-start items-start shadow-md"
      style={{ background: props.SecondaryColor }} // צבע ברירת מחדל
    >
      {/* כותרת האירוע */}
      <p className="font-semibold text-base max-md:text-sm truncate">
        {props?.Subject || "אירוע חדש"}
      </p>

      {/* שם הלקוח (אם קיים) */}
      {props?.ExtendedProperties?.private?.customerName && (
        <p className="text-sm max-md:text-xs opacity-90">
          לקוח: {props.ExtendedProperties.private.customerName}
        </p>
      )}

      {/* שעות האירוע */}
      <p className="text-sm max-md:text-xs opacity-75">
        <span className="text-lg">⏰</span> {getTimeString(props.StartTime)} -{" "}
        {getTimeString(props.EndTime)}
      </p>
    </div>
  );
}

export default eventTemplate;

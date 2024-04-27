import React from "react";
import dayjs from "dayjs";
import he from "dayjs/locale/he";

// Set Hebrew locale globally
dayjs.locale(he);

function CustomHeaderTemplate(props: any) {
  const dayDateFormatting = dayjs(props?.date).format("D");
  const dayFormatting = dayjs(props?.date).format("dd");
  const isToday =
    dayjs().format("DD/MM/YYYY") === dayjs(props?.date).format("DD/MM/YYYY");
  return (
    <div className="flex justify-center items-center">
      <div
        className={`flex flex-col justify-center items-center gap-0 rounded-full h-14 w-14 text-center ${
          isToday ? " bg-blue-500 text-white" : ""
        }`}
      >
        <div className="font-normal text-xl text-center">{dayFormatting}</div>
        <div className="font-bold text-xl text-center">{dayDateFormatting}</div>
      </div>
    </div>
  );
}
export default CustomHeaderTemplate;

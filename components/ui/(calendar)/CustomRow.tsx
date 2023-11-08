import React from "react";
import { Tooltip } from "antd";
import dayjs from "dayjs";
import TimeSlot from "./TimeSlot";
import { AppointmentEvent } from "types/types";

function CustomRow(props: any, openingTime: dayjs.Dayjs) {
  const children = props?.children[1] as string;
  const time = props?.record?.key;
  const today = dayjs();
  const isRoundHour = children && String(children).split(":")[1] === "00";

  const isToday = (date: string) =>
    dayjs(date).format("DD/MM/YYY") == today.format("DD/MM/YYYY");

  const renderSlots = (time: string) => {
    return <TimeSlot props={props} />;
  };

  if (!children) {
    return <>{renderSlots(time)}</>;
  } else if (!isRoundHour && typeof children == "string")
    return (
      <td
        {...props}
        onMouseEnter={null}
        onMouseLeave={null}
        className={`p-0 h-5  !important w-20 border border-gray-500/50  ${
          isToday(time) ? "bg-slate-700" : "bg-slate-200"
        } `}
        onClick={() => console.log(props)}
      >
        <p key={children}></p>
      </td>
    );
  else if (isRoundHour && typeof children == "string")
    return (
      <td
        {...props}
        onMouseEnter={null}
        onMouseLeave={null}
        className={`p-0 h-5 !important w-20 border border-gray-500/50  ${
          isToday(time) ? "bg-slate-700" : "bg-slate-200"
        } `}
        onClick={() => console.log(props)}
      >
        <p
          key={children}
          className={`absolute ${
            children == openingTime.format("HH:mm") ? "top-0" : "-top-4"
          } right-4 text-xl font-semibold border-t-0 text-black bg-slate-200 z-50 !important text-center`}
        >
          {children}
        </p>
      </td>
    );
  else {
    return (
      <td
        {...props}
        onMouseEnter={null}
        onMouseLeave={null}
        className={`text-xl font-semibold border-t-0 text-black bg-slate-200 z-50 !important text-center p-0 h-5 !important w-12 border border-gray-500/50  ${
          isToday(time) ? "bg-slate-700" : "bg-slate-200"
        } `}
      >
        {children}
      </td>
    );
  }
}

export default CustomRow;

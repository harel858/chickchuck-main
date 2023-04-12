import classes from "./style.module.css";
import React from "react";
import { AppointmentEvent } from "../../../../../types";
import dayjs from "dayjs";

function ToolTip({ event }: { event: AppointmentEvent }) {
  const start = dayjs(event.start).format("h:mm A");
  const end = dayjs(event.end).format("h:mm A");
  return (
    <div
      className={`flex bg-white/20 rounded-3xl  ${classes.roboto} w-full   overflow-hidden`}
    >
      <nav
        className={`flex justify-between gap-5 ${event.color} text-white rounded-t-3xl w-max px-5 relative top-0 py-3`}
      >
        <p className="font-normal text-lg w-max">{event.customer.name}</p>
        <p className="font-normal text-lg w-max">
          {start} - {end}
        </p>
      </nav>
      <div></div>
    </div>
  );
}

export default ToolTip;

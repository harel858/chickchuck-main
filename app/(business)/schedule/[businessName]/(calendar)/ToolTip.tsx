import classes from "./style.module.css";
import React from "react";
import { motion } from "framer-motion";
import { AppointmentEvent } from "../../../../../types";
import dayjs from "dayjs";

function ToolTip({ event }: { event: AppointmentEvent }) {
  const start = dayjs(event.start).format("h:mm A");
  const end = dayjs(event.end).format("h:mm A");
  return (
    <div
      className={`flex flex-col gap-5 bg-white/90 rounded-3xl  ${classes.roboto} w-max  `}
    >
      <nav
        className={`flex justify-between gap-5 ${event.color} text-white rounded-t-3xl w-full px-5 relative top-0 py-3`}
      >
        <p className="font-normal text-lg w-max">{event.customer.name}</p>
        <p className="font-normal text-lg w-max">
          {start} - {end}
        </p>
      </nav>
      <div className="w-full flex flex-col gap-3 text-black">
        <section className="flex flex-col justify-center items-center p-3 gap-4 w-max">
          <div className="flex gap-6 justify-start items-center w-max">
            <p className="font-semibold text-lg">Status:{event.status}</p>
            <motion.button
              className="p-2 text-xl rounded-2xl border border-black bg-rose-500"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Cancel Appointment
            </motion.button>
            <div></div>
            <div></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ToolTip;

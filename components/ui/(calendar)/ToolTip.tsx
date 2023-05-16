import classes from "./style.module.css";
import React from "react";
import { motion } from "framer-motion";
import { AppointmentEvent } from "../../../types/types";
import dayjs from "dayjs";

function ToolTip({ event }: { event: AppointmentEvent }) {
  const start = dayjs(event.start).format("HH:mm");
  const end = dayjs(event.end).format("HH:mm");
  return (
    <div
      className={`flex flex-col gap-5 rounded-2xl  ${classes.ToolTip} w-max border border-black m-0 p-0 absolute`}
    >
      <nav
        className={`flex justify-around gap-5 ${event.color} bg-opacity-60 text-black rounded-t-2xl w-full px-5 relative top-0 py-3`}
      >
        <p className="font-normal text-lg w-max">{event.customer.name}</p>
        <p className="font-normal  text-lg w-max">
          {start} - {end}
        </p>
      </nav>
      <div className="w-full flex flex-col gap-3 text-black">
        <section className="flex flex-col justify-center items-start p-3 px-5 gap-4 w-max">
          <div className="flex gap-6 justify-start items-center  w-max ">
            <p className="font-semibold text-xl">
              Status:
              <span className="font-light text-lg"> {event.status}</span>
            </p>
            <motion.button
              className="p-2 text-sm rounded-2xl border hover:border-black hover:text-white bg-white border-red-600  text-red-600 hover:bg-red-600"
              whileHover={{ scale: 1.2 }}
              disabled={event.status !== "SCHEDULED"}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Cancel Appointment
            </motion.button>
          </div>
          <p className="font-semibold text-xl">
            Type of Service:
            <span className="font-light text-lg"> {event.treatment.title}</span>
          </p>
          <p className="font-semibold text-xl">
            Charge:
            <span className="font-light text-lg"> {event.treatment.cost}$</span>
          </p>
          <p className="font-semibold text-xl">
            Date:
            <span className="font-light text-lg"> {event.date}</span>
          </p>
        </section>
      </div>
    </div>
  );
}

export default ToolTip;

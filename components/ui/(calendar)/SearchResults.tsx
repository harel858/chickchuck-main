"use client";
import classes from "./style.module.css";
import React from "react";
import { motion } from "framer-motion";
import Event from "./Event";
import NoAppointments from "./NoAppointments";
import { AppointmentEvent } from "../../../types/types";
function SearchResults({
  searchQuery,
  events,
}: {
  searchQuery: string;
  events: AppointmentEvent[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        easeInOut: [0, 0.71, 0.2, 1.01],
      }}
      className="flex w-full items-stretch max-xl:items-center justify-center max-h-max max-xl:flex-col"
    >
      {events.length <= 0 ? (
        <NoAppointments title="Client not found in the system" />
      ) : (
        <ul
          className={`${classes.ul} flex flex-1 w-full flex-col justify-start content-center items-start overflow-y-auto overflow-x-hidden border-t border-gray-500 rounded-bl-3xl rounded-br-3xl max-h-[27.5rem] `}
        >
          {events.map((event, i) => (
            <Event key={event.id} i={i} event={event} />
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default SearchResults;

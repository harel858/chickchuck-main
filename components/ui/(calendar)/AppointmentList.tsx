"use client";
import "./AppointmentList.css";
import React from "react";
import NoAppointments from "./NoAppointments";
import { Calendar } from "antd";
import Event from "./Event";
import dayjs, { Dayjs } from "dayjs";
import { AppointmentEvent } from "../../../types/types";
import { motion } from "framer-motion";

function AppointmentList({
  value,
  onSelect,
  eventsByDate,
}: {
  value: dayjs.Dayjs;
  onSelect: (newValue: Dayjs) => void;
  eventsByDate: AppointmentEvent[];
}) {
  console.log(eventsByDate);

  const noAppointmens = eventsByDate.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        easeInOut: [0, 0.71, 0.2, 1.01],
      }}
      className="flex w-full items-stretch max-xl:items-center justify-center h-full max-xl:flex-col"
    >
      <div className="max-xl:w-full block w-1/4 ">
        <div className="max-xl:hidden rounded-3xl">
          <Calendar
            className={`rounded-none text-md  bg-orange-300/75`}
            fullscreen={false}
            value={value}
            onChange={(e) => e && onSelect(e)}
            defaultValue={dayjs()}
          />
        </div>
        <div className="hidden relative max-xl:flex border border-gray-500 cursor-pointer justify-center items-center content-center w-full"></div>
      </div>
      {noAppointmens ? (
        <NoAppointments title="No Appointments For Today" />
      ) : (
        <ul
          className={`flex flex-1 w-full flex-col justify-start content-center items-start overflow-y-auto overflow-x-hidden border-t border-gray-500 rounded-bl-3xl rounded-br-3xl max-h-[27.5rem] `}
        >
          {eventsByDate.map((event, i) => (
            <Event key={event.id} i={i} event={event} />
          ))}
        </ul>
      )}
    </motion.div>
  );
}
const MemoizedAppointmentList = React.memo(AppointmentList);

export default MemoizedAppointmentList;

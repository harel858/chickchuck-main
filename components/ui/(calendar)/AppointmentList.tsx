"use client";
import "./AppointmentList.css";
import React from "react";
import NoAppointments from "./NoAppointments";
import { Calendar, DatePicker } from "antd";
import Event from "./Event";
import dayjs, { Dayjs } from "dayjs";
import { AppointmentEvent } from "../../../types/types";
import { motion } from "framer-motion";
import { Address } from "@prisma/client";

function AppointmentList({
  value,
  onSelect,
  eventsByDate,
  business,
}: {
  value: dayjs.Dayjs;
  onSelect: (newValue: Dayjs) => void;
  eventsByDate: AppointmentEvent[];
  business: {
    openingTime: string;
    closingTime: string;
    activityDays: number[];
    address: Address;
  };
}) {
  const noAppointmens = eventsByDate.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        easeInOut: [0, 0.71, 0.2, 1.01],
      }}
      className="flex h-full w-full items-stretch max-xl:items-center justify-center max-xl:flex-col"
    >
      <div className="max-xl:w-full w-1/4 h-fit border-r border-gray-300">
        <div className="max-xl:hidden rounded-3xl">
          <Calendar
            className={`rounded-none text-md`}
            fullscreen={false}
            value={value}
            onChange={(e) => e && onSelect(e)}
            defaultValue={dayjs()}
          />
        </div>
        <div className="max-xl:flex hidden rounded-3xl w-full">
          <DatePicker
            presets={[
              { label: "Yesterday", value: dayjs().add(-1, "d") },
              { label: "Last Week", value: dayjs().add(-7, "d") },
              { label: "Last Month", value: dayjs().add(-1, "month") },
            ]}
            onChange={(e) => e && onSelect(e)}
            className="w-full cursor-pointer p-5"
          />
        </div>
        <div className="hidden relative max-xl:flex border border-gray-500 cursor-pointer justify-center items-center content-center w-full"></div>
      </div>
      {noAppointmens ? (
        <NoAppointments title={"No Appointments For Today"} />
      ) : (
        <ul
          className={`flex flex-1 w-full flex-col justify-start content-center items-start overflow-y-auto overflow-x-hidden border-t border-gray-500 rounded-bl-3xl rounded-br-3xl max-h-[27.5rem] `}
        >
          {eventsByDate.map((event, i) => (
            <Event key={event.id} i={i} event={event} business={business} />
          ))}
        </ul>
      )}
    </motion.div>
  );
}
const MemoizedAppointmentList = React.memo(AppointmentList);

export default MemoizedAppointmentList;

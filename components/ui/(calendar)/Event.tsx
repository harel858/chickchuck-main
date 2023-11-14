"use client";
import React, { useRef, useState } from "react";
import { AppointmentEvent, BusinessProps } from "../../../types/types";
import ToolTip from "./ToolTip";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { Modal } from "antd";
import { MdFreeBreakfast } from "react-icons/md";

function Event({
  event,
  business,
  i,
}: {
  event: AppointmentEvent;
  business: BusinessProps;
  i: number;
}) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [modal1Open, setModal1Open] = useState(false);
  const delay = i * 0.1; // Adjust the delay duration as needed
  const start = dayjs(event.start).format("HH:mm");
  const end = dayjs(event.end).format("HH:mm");
  return (
    <>
      <motion.li
        key={event.id}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{
          duration: 0.3,
          easeInOut: [0, 0.71, 0.2, 1.01],
          delay,
        }}
        onClick={() => setModal1Open(true)}
        className={`w-full hover:bg-gray-900 bg-rose-50/80 text-black cursor-pointer hover:text-white relative px-16 py-7 border-b border-black/50 flex justify-between max-md:flex-col gap-10 items-center`}
      >
        <span
          className={`absolute h-2/3 w-1 bottom-4 left-6 ${event.color} bg-opacity-60 font-extrabold rounded-full`}
        ></span>
        <div className="flex flex-col gap-1 justify-center items-start max-md:items-center ">
          <p className="font-medium text-xl w-max">
            {"treatment" in event && event.treatment?.title}
          </p>
          <p className="font-thin text-lg">
            {"customer" in event && event.customer.name}
          </p>
        </div>
        <p className="font-extralight text-lg">{event.date}</p>
        <div className="flex flex-col gap-1 justify-center items-center max-md:flex-row">
          <p className="font-normal text-xl">{start}</p>
          <p className="hidden max-md:inline-block">-</p>
          <p className="font-extralight text-lg">{end}</p>
        </div>
      </motion.li>
      <Modal
        title={
          <div className="flex flex-row justify-center items-center gap-2">
            <h3 className="font-sans text-2xl"> Break Times</h3>
            <MdFreeBreakfast className="text-4xl" />
          </div>
        }
        className="pt-5"
        centered
        open={modal1Open}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => {
          setModal1Open(false);
        }}
        styles={{
          body: {
            background: "rgba(254,215,170,0.7)",
            borderRadius: "3em",
            padding: "2em",
            margin: "0 auto",
          },
        }}
      >
        <ToolTip ref={tooltipRef} business={business} event={event} />
      </Modal>
    </>
  );
}

export default Event;

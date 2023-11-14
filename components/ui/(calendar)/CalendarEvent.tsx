"use client";
import React, { useRef, useState, useTransition } from "react";
import { AppointmentEvent, BusinessProps } from "../../../types/types";
import ToolTip from "./ToolTip";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { Modal } from "antd";
import { FaUserClock } from "react-icons/fa";
import { MdFreeBreakfast } from "react-icons/md";
import { Button } from "@ui/Button";
import { BiTrash } from "react-icons/bi";
import { deleteAppointment } from "actions/deleteAppointment";

function Event({
  event,
  viewMode,
  business,
}: {
  event: AppointmentEvent;
  viewMode: "weekly" | "daily";
  business: BusinessProps;
}) {
  console.log("init");

  const tooltipRef = useRef<HTMLDivElement>(null);
  const [modal1Open, setModal1Open] = useState(false);
  const [isPending, startTransition] = useTransition();
  const start = dayjs(event.start).format("HH:mm");
  const end = dayjs(event.end).format("HH:mm");
  return (
    <>
      <motion.div
        key={event.id}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.01 }}
        transition={{
          duration: 0.3,
          easeInOut: [0, 0.71, 0.2, 1.01],
        }}
        onClick={() => setModal1Open(true)}
        className={`overflow-hidden z-50 bg-slate-950 flex flex-col ${
          viewMode === "weekly" ? `w-full` : `w-max pr-5`
        } h-full dark:bg-slate-200 dark:text-black dark:hover:text-white dark:hover:bg-slate-900 hover:bg-gray-700 pl-2  bg-sky-800/90  cursor-pointer text-white relative border-b border-black/50  rounded-lg`}
      >
        <span
          className={`absolute h-5/6 w-1 bottom-2 left-1 ${event.color}  font-extrabold rounded-full`}
        ></span>
        <div className="flex flex-col justify-center items-start pt-2 px-2 gap-0 pointer-events-none">
          <p className="font-medium text-lg">
            {"customer" in event ? event.customer?.name : event.recipient.name}
          </p>
          <p className="font-normal text-lg">
            {start} - {end}
          </p>
          <p className="font-medium text-lg text-left">
            {"treatment" in event ? event.treatment?.title : event.title}
          </p>
        </div>
      </motion.div>
      <Modal
        title={
          "variant" in event ? (
            <div className={`flex flex-row justify-center items-center gap-2 `}>
              <h3 className="font-sans text-2xl">Break</h3>
              <MdFreeBreakfast className="text-4xl" />
            </div>
          ) : (
            <div className={`flex flex-row justify-center items-center gap-2 `}>
              <h3 className="font-sans text-2xl"> Appointment</h3>
              <FaUserClock className="text-4xl" />
            </div>
          )
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "beige",
            borderRadius: "3em",
            padding: "2em",
            margin: "0 auto",
          },
        }}
      >
        {"variant" in event ? (
          <Button
            className="flex gap-2 p-2 text-sm rounded-xl border hover:border-black hover:text-white bg-white border-red-600  text-red-600 hover:bg-red-600 group"
            onClick={() => startTransition(() => deleteAppointment(event))}
            isLoading={isPending}
            type="button"
          >
            Delete Break
            <BiTrash className="text-2xl text-red-500 group-hover:text-white" />
          </Button>
        ) : (
          <ToolTip ref={tooltipRef} business={business} event={event} />
        )}
      </Modal>
    </>
  );
}

export default Event;

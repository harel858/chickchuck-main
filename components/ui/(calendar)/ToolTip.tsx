"use client";
import classes from "./style.module.css";
import React, { forwardRef } from "react";
import ButtonsGroup from "./WhatsappButtons";
import { motion } from "framer-motion";
import { AppointmentEvent } from "../../../types/types";
import dayjs from "dayjs";
import DownloadPDF from "@components/PDF/InovicePDF";
import { Address } from "@prisma/client";

const ToolTip = forwardRef<
  HTMLDivElement,
  {
    event: AppointmentEvent;
    business: {
      openingTime: string;
      closingTime: string;
      activityDays: number[];
      address: Address | undefined;
    };
  }
>(({ event, business }, ref) => {
  const start = dayjs(event.start).format("HH:mm");
  const end = dayjs(event.end).format("HH:mm");
  return (
    <div
      ref={ref}
      className={`flex flex-col gap-5 rounded-2xl ${classes.ToolTip} w-full m-0 p-0`}
    >
      <div
        className={`flex justify-center gap-5 ${event.color} bg-opacity-60 text-black rounded-t-2xl w-full px-5 py-3`}
      >
        <p className="font-semibold text-lg w-max">
          {"customer" in event && event.customer.name}
        </p>
        <p className="font-semibold text-lg w-max">
          {start} - {end}
        </p>
      </div>
      <div className="w-full flex flex-col gap-3 text-black">
        <div className="flex flex-col justify-center items-start p-3 px-5 gap-4 w-max">
          <div className="flex gap-6 justify-start items-center w-max">
            <p className="font-semibold text-xl">
              Status:
              <span className="font-light text-lg"> {event.status}</span>
            </p>
          </div>
          <p className="font-semibold text-xl">
            Recipient:
            <span className="font-light text-lg"> {event.recipient.name}</span>
          </p>
          <p className="font-semibold text-xl">
            Type of Service:
            <span className="font-light text-lg">
              {"treatment" in event && event.treatment?.title}
            </span>
          </p>
          <p className="font-semibold text-xl">
            Charge:
            <span className="font-light text-lg">
              {"treatment" in event && event.treatment?.cost}$
            </span>
          </p>
          <p className="font-semibold text-xl">
            Date:
            <span className="font-light text-lg"> {event.date}</span>
          </p>
        </div>
      </div>
      {event.status === "SCHEDULED" && <ButtonsGroup event={event} />}
      {event.status === "COMPLETED" && (
        <DownloadPDF business={business} event={event} />
      )}
    </div>
  );
});

export default ToolTip;

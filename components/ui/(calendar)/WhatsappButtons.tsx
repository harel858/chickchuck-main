"use client";
import { queueReminder } from "@actions";
import { Button } from "@ui/Button";
import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import { AppointmentEvent } from "../../../types/types";

function WhatsappButtons({ event }: { event: AppointmentEvent }) {
  return (
    <div
      className={`flex justify-around gap-5 bg-gray-900 text-black rounded-b-2xl w-full px-5 relative top-0 py-3`}
    >
      <Button variant={"subtle"} onClick={() => queueReminder("sh")}>
        Queue Reminder
        <span className=" mx-2 text-green-500 text-xl">
          <BsWhatsapp />
        </span>
      </Button>
    </div>
  );
}

export default WhatsappButtons;

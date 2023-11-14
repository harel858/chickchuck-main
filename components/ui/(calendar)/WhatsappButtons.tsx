"use client";
import React, { useTransition } from "react";
import { queueReminder } from "@actions";
import { Button } from "@ui/Button";
import { BsWhatsapp } from "react-icons/bs";
import { AppointmentEvent } from "../../../types/types";
import { BiTrash } from "react-icons/bi";
import { Popconfirm } from "antd";
import { deleteAppointment } from "actions/deleteAppointment";

function WhatsappButtons({ event }: { event: AppointmentEvent }) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className={`flex justify-around gap-5 ${event.color} bg-opacity-60 dark:bg-gray-300 text-black rounded-b-2xl w-full px-5 relative top-0 py-3`}
    >
      <Button variant={"subtle"} onClick={() => queueReminder("sh")}>
        Queue Reminder
        <span className="mx-2 text-green-500 text-xl">
          <BsWhatsapp />
        </span>
      </Button>
      <Popconfirm
        title="Cancel This Appointment"
        description="Are you sure you want to cancel this appointment?"
        onConfirm={() => startTransition(() => deleteAppointment(event))}
        okText="Yes"
        okButtonProps={{
          color: "black",
          style: { background: "rgb(0, 86, 206)" },
        }}
        cancelText="No"
      >
        <Button
          className="flex gap-2 p-2 text-sm rounded-xl border hover:border-black hover:text-white bg-white border-red-600  text-red-600 hover:bg-red-600 group"
          onClick={() =>
            console.log("event.appointmentSlot", event.appointmentSlot)
          }
          isLoading={isPending}
          type="button"
        >
          Cancel
          <BiTrash className="text-2xl text-red-500 group-hover:text-white" />
        </Button>
      </Popconfirm>
    </form>
  );
}

export default WhatsappButtons;

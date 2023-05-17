import React from "react";
import { AppointmentEvent } from "../../../types/types";
import ToolTip from "./ToolTip";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { motion } from "framer-motion";
import dayjs, { Dayjs } from "dayjs";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    margin: "0",
    padding: "0",
    borderRadius: "1.5rem",
    backgroundColor: "beige",
  },
}));

function Event({ event, i }: { event: AppointmentEvent; i: number }) {
  const delay = i * 0.1; // Adjust the delay duration as needed
  const start = dayjs(event.start).format("HH:mm");
  const end = dayjs(event.end).format("HH:mm");

  return (
    <HtmlTooltip
      key={event.id}
      title={<ToolTip event={event} />}
      leaveDelay={500}
    >
      <motion.li
        key={event.id}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{
          duration: 0.4,
          easeInOut: [0, 0.71, 0.2, 1.01],
          delay,
        }}
        className={`w-full hover:bg-black/80 bg-white/90 text-black cursor-pointer hover:text-white relative px-16 py-7 border-b border-black/50 flex justify-between`}
      >
        <span
          className={`absolute h-2/3 w-1 bottom-4 left-6 ${event.color} bg-opacity-60 font-extrabold rounded-full`}
        ></span>
        <div className="flex flex-col gap-1 justify-center items-start ">
          <p className="font-normal text-xl">{event.treatment.title}</p>
          <p className="font-extralight text-lg">{event.customer.name}</p>
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <p className="font-normal text-xl">{start}</p>
          <p className="font-extralight text-lg">{end}</p>
        </div>
      </motion.li>
    </HtmlTooltip>
  );
}

export default Event;

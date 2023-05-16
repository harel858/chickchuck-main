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
    position: "absolute",
    borderRadius: "1.5rem",
    backgroundColor: "beige",
  },
}));

function Event({ event }: { event: AppointmentEvent }) {
  const start = dayjs(event.start).format("HH:mm");
  const end = dayjs(event.end).format("HH:mm");
  return (
    <HtmlTooltip
      key={event.id}
      title={<ToolTip event={event} key={event.id} />}
      enterDelay={500}
      leaveDelay={500}
    >
      <motion.div
        key={event.id}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.01 }}
        transition={{
          duration: 0.3,
          easeInOut: [0, 0.71, 0.2, 1.01],
        }}
        className={`flex flex-col w-full h-full hover:bg-gray-500 pl-2  bg-blue-500/50 text-black cursor-pointer hover:text-white relative border-b border-black/50  rounded-xl`}
      >
        <span
          className={`absolute h-5/6 w-1 bottom-2 left-1 ${event.color}  font-extrabold rounded-full`}
        ></span>
        <div className="flex flex-col justify-center items-start pt-2 pl-2 gap-1 ">
          <p className="font-medium text-md">{event.treatment.title}</p>
          <p className="font-medium text-md">{event.customer.name}</p>
          <p className="font-normal text-md">
            {start} - {end}
          </p>
        </div>
        {/* <div className="flex flex-col gap-1 justify-center items-center">
          <p className="font-normal text-xl">
            {dayjs(event.start).format("h:mm A")}
          </p>
          <p className="font-extralight text-lg">
            {dayjs(event.end).format("h:mm A")}
          </p>
        </div> */}
      </motion.div>
    </HtmlTooltip>
  );
}

export default Event;

"use client";
import React, { useRef } from "react";
import { AppointmentEvent, BusinessProps } from "../../../types/types";
import ToolTip from "./ToolTip";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import ClickAwayListener from "@mui/material/ClickAwayListener";
const HtmlTooltip = styled(
  ({
    handleTooltipClose,
    className,
    ...props
  }: TooltipProps & {
    handleTooltipClose: (e: MouseEvent | TouchEvent) => void;
  }) => (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip {...props} classes={{ popper: className }} />
    </ClickAwayListener>
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    margin: "0",
    padding: "0",
    borderRadius: "1.5rem",
    backgroundColor: "beige",
  },
}));

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
  const [open, setOpen] = React.useState(false);
  const handleTooltipClose = (e: MouseEvent | TouchEvent) => {
    if (tooltipRef.current && tooltipRef.current.contains(e.target as Node)) {
      return; // Don't close if the click is inside the tooltip content
    }
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const delay = i * 0.1; // Adjust the delay duration as needed
  const start = dayjs(event.start).format("HH:mm");
  const end = dayjs(event.end).format("HH:mm");
  return (
    <HtmlTooltip
      key={event.id}
      PopperProps={{
        disablePortal: true,
      }}
      title={<ToolTip ref={tooltipRef} business={business} event={event} />}
      open={open}
      handleTooltipClose={handleTooltipClose}
      disableFocusListener
      disableHoverListener
      disableTouchListener
    >
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
        onClick={handleTooltipOpen}
        className={`w-full hover:bg-gray-900 bg-rose-50/80 text-black cursor-pointer hover:text-white relative px-16 py-7 border-b border-black/50 flex justify-between max-md:flex-col gap-10 items-center`}
      >
        <span
          className={`absolute h-2/3 w-1 bottom-4 left-6 ${event.color} bg-opacity-60 font-extrabold rounded-full`}
        ></span>
        <div className="flex flex-col gap-1 justify-center items-start max-md:items-center ">
          <p className="font-medium text-xl w-max">{event.treatment?.title}</p>
          <p className="font-thin text-lg">{event.customer.name}</p>
        </div>
        <p className="font-extralight text-lg">{event.date}</p>
        <div className="flex flex-col gap-1 justify-center items-center max-md:flex-row">
          <p className="font-normal text-xl">{start}</p>
          <p className="hidden max-md:inline-block">-</p>
          <p className="font-extralight text-lg">{end}</p>
        </div>
      </motion.li>
    </HtmlTooltip>
  );
}

export default Event;

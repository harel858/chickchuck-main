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
  viewMode,
  business,
}: {
  event: AppointmentEvent;
  viewMode: "weekly" | "daily";
  business: BusinessProps;
}) {
  console.log("init");

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
      <motion.div
        key={event.id}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.01 }}
        transition={{
          duration: 0.3,
          easeInOut: [0, 0.71, 0.2, 1.01],
        }}
        onClick={handleTooltipOpen}
        className={`overflow-hidden z-50 bg-slate-950 flex flex-col ${
          viewMode === "weekly" ? `w-full` : `w-max pr-5`
        } h-full dark:bg-slate-200 dark:text-black dark:hover:text-white dark:hover:bg-slate-900 hover:bg-gray-700 pl-2  bg-sky-800/90  cursor-pointer text-white relative border-b border-black/50  rounded-lg`}
      >
        <span
          className={`absolute h-5/6 w-1 bottom-2 left-1 ${event.color}  font-extrabold rounded-full`}
        ></span>
        <div className="flex flex-col justify-center items-start pt-2 pl-2 gap-1 pointer-events-none">
          <p className="font-medium text-lg text-left">
            {"treatment" in event ? event.treatment?.title : event.title}
          </p>
          <p className="font-medium text-lg">{event.customer.name}</p>
          <p className="font-normal text-lg">
            {start} - {end}
          </p>
        </div>
      </motion.div>
    </HtmlTooltip>
  );
}

export default Event;

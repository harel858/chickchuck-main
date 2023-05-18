"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import dayjs, { Dayjs } from "dayjs";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { ScheduleProps } from "../../../types/types";
import ToggleView from "./ToggleView";
import { Button } from "@ui/Button";

const scaleSpringTransition = {
  type: "spring",
  stiffness: 750,
  damping: 10,
};

function ListNav({
  selectedValue,
  onSelect,
  setCurrentView,
  currentView,
  searchQuery,
  onSearchChange,
}: {
  selectedValue: Dayjs;
  onSelect: (newValue: Dayjs) => void;
  currentView: "list" | "calendar";
  setCurrentView: React.Dispatch<React.SetStateAction<"list" | "calendar">>;
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const currentDate = selectedValue.format("MMMM D, YYYY");

  const handleDateChange = (amount: number) => {
    const newDate = selectedValue.add(amount, "day");
    onSelect(newDate);
  };

  return (
    <nav className="flex flex-row-reverse content-center justify-between items-center bg-orange-300/75 font-extralight rounded-tr-3xl rounded-tl-3xl w-full relative top-0 p-3 px-5 gap-5">
      <ToggleView setCurrentView={setCurrentView} currentView={currentView} />

      <motion.input
        transition={{ type: "spring", stiffness: 750, damping: 10 }}
        whileHover={{ scale: 1.2 }}
        type="text"
        placeholder="Search clients"
        value={searchQuery}
        onChange={onSearchChange}
        className="dark:text-white px-2 py-1 text-xl rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-center items-center gap-1">
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={scaleSpringTransition}
        >
          <BsArrowLeftCircle
            className="text-4xl rounded-full hover:bg-white/70 cursor-pointer"
            onClick={() => handleDateChange(currentView === "list" ? -1 : -7)}
          />
        </motion.div>

        <Button
          variant="ghost"
          className="rounded-3xl dark:text-white"
          onClick={() => onSelect(dayjs())}
        >
          Today
        </Button>

        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={scaleSpringTransition}
        >
          <BsArrowRightCircle
            className="text-4xl rounded-full hover:bg-white/70 cursor-pointer"
            onClick={() => handleDateChange(currentView === "list" ? 1 : 7)}
          />
        </motion.div>
      </div>
    </nav>
  );
}

export default ListNav;

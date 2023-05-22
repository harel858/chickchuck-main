"use client";
import React, { useState } from "react";
import ToggleView from "./ToggleView";
import ToggleViewMode from "./ToggleViewMode";
import { motion } from "framer-motion";
import dayjs, { Dayjs } from "dayjs";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { ScheduleProps } from "../../../types/types";
import { Button } from "@ui/Button";
interface ListNavProps {
  setViewMode: React.Dispatch<React.SetStateAction<"daily" | "weekly">>;
  viewMode: "weekly" | "daily";
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: Dayjs;
  onSelect: (newValue: Dayjs) => void;
  currentView: "list" | "calendar";
  setCurrentView: React.Dispatch<React.SetStateAction<"list" | "calendar">>;
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const scaleSpringTransition = {
  type: "spring",
  stiffness: 750,
  damping: 10,
};

function ListNav({
  setSearchQuery,
  selectedValue,
  onSelect,
  setCurrentView,
  currentView,
  searchQuery,
  onSearchChange,
  setViewMode,
  viewMode,
}: ListNavProps) {
  const currentDate = selectedValue.format("MMMM D, YYYY");

  const handleDateChange = (amount: number) => {
    const newDate = selectedValue.add(amount, "day");
    onSelect(newDate);
  };

  return (
    <nav className="flex flex-row-reverse max-md:flex-col flex-wrap content-center justify-between items-center bg-orange-300/75 font-extralight rounded-tr-3xl rounded-tl-3xl w-full relative top-0 p-3 px-5 gap-2">
      <div className="flex justify-center items-center content-center gap-5">
        {currentView === "calendar" && (
          <ToggleViewMode
            setSearchQuery={setSearchQuery}
            setViewMode={setViewMode}
            viewMode={viewMode}
          />
        )}
        <ToggleView
          setSearchQuery={setSearchQuery}
          setCurrentView={setCurrentView}
          currentView={currentView}
        />
      </div>
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
          <MdKeyboardDoubleArrowLeft
            className="text-4xl rounded-full hover:bg-white/70 cursor-pointer"
            onClick={() => {
              handleDateChange(-7);
              setSearchQuery("");
            }}
          />
        </motion.div>

        {viewMode !== "daily" && currentView == "calendar" ? (
          <></>
        ) : (
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={scaleSpringTransition}
          >
            <BsArrowLeftCircle
              className="text-4xl rounded-full hover:bg-white/70 cursor-pointer"
              onClick={() => {
                handleDateChange(-1);
                setSearchQuery("");
              }}
            />
          </motion.div>
        )}

        <Button
          variant="ghost"
          className="rounded-3xl dark:text-white"
          onClick={() => {
            onSelect(dayjs());
            setSearchQuery("");
          }}
        >
          Today
        </Button>
        {viewMode !== "daily" && currentView == "calendar" ? (
          <></>
        ) : (
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={scaleSpringTransition}
          >
            <BsArrowRightCircle
              className="text-4xl rounded-full hover:bg-white/70 cursor-pointer"
              onClick={() => {
                handleDateChange(1);
                setSearchQuery("");
              }}
            />
          </motion.div>
        )}

        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={scaleSpringTransition}
        >
          <MdKeyboardDoubleArrowRight
            className="text-4xl rounded-full hover:bg-white/70 cursor-pointer"
            onClick={() => {
              handleDateChange(7);
              setSearchQuery("");
            }}
          />
        </motion.div>
      </div>
    </nav>
  );
}

export default ListNav;

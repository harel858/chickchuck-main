"use client";
import React, { useState } from "react";
import ToggleView from "./ToggleView";
import ToggleViewMode from "./ToggleViewMode";
import { AnimatePresence, motion } from "framer-motion";
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
  duration: 0.3,
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
  const handleDateChange = (amount: number) => {
    const newDate = selectedValue.add(amount, "day");
    onSelect(newDate);
  };

  return (
    <nav className="flex flex-row-reverse max-md:flex-col max-md:items-start flex-wrap content-center justify-between items-center bg-orange-200/90 font-extralight w-full relative top-0 p-3 px-10 gap-2 transition-all duration-1000 ease-in-out">
      <div className="flex justify-center items-center gap-3">
        <ToggleView
          setSearchQuery={setSearchQuery}
          setCurrentView={setCurrentView}
          currentView={currentView}
        />
        {currentView === "list" ? (
          <motion.h2
            key="list"
            className="text-4xl font-normal"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={scaleSpringTransition}
          >
            {selectedValue.format("MMMM D, YYYY")}
          </motion.h2>
        ) : (
          <motion.h2
            key="calendar"
            className="text-4xl font-normal"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={scaleSpringTransition}
          >
            {selectedValue.format("MMMM , YYYY")}
          </motion.h2>
        )}
      </div>

      <motion.div
        className="flex justify-center items-center content-center gap-5 max-md:items-start max-md:justify-start max-md:w-11/12 max-md:flex-wrap"
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <AnimatePresence>
          {currentView === "calendar" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ToggleViewMode
                setSearchQuery={setSearchQuery}
                setViewMode={setViewMode}
                viewMode={viewMode}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="flex justify-center items-center gap-3">
        <div className="flex justify-center items-center gap-1">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
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
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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
          </AnimatePresence>
        </div>
        <motion.input
          transition={{ type: "spring", stiffness: 750, damping: 10 }}
          whileHover={{ scale: 1.1 }}
          type="text"
          placeholder="Search clients"
          value={searchQuery}
          onChange={onSearchChange}
          className="dark:text-white px-2 py-1 text-xl rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </nav>
  );
}

export default ListNav;

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import dayjs, { Dayjs } from "dayjs";
import { DatePickerProps, Select } from "antd";
import { DatePicker } from "antd";
import { ScheduleData, ScheduleProps } from "types/types";
import { UserOutlined } from "@ant-design/icons";

interface ListNavProps {
  scheduleProps: ScheduleProps;
  /*   setViewMode: React.Dispatch<React.SetStateAction<"daily" | "weekly">>;
   */ viewMode: "weekly" | "daily";
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: Dayjs;
  onSelect: (newValue: Dayjs) => void;
  currentView: "list" | "calendar";
  /*   setCurrentView: React.Dispatch<React.SetStateAction<"list" | "calendar">>;
   */ searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedUser: (newValue: { value: string; label: string }) => void;
  selectedUser: {
    value: string;
    label: string;
  };
}

const scaleSpringTransition = {
  type: "spring",
  stiffness: 750,
  damping: 10,
  duration: 0.3,
};

function ListNav({
  onSelect,
  searchQuery,
  onSearchChange,
  scheduleProps,
  setSelectedUser,
  selectedUser,
}: ListNavProps) {
  const weekFormat = "MM/DD";

  const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
    `${dayjs(value).startOf("week").format(weekFormat)} ~ ${dayjs(value)
      .endOf("week")
      .format(weekFormat)}`;

  return (
    <div className="flex justify-between flex-row flex-wrap max-xl:justify-center content-center items-center bg-slate-200 font-extralight w-full relative top-0 py-5 px-10 gap-2 transition-all duration-1000 ease-in-out">
      <div className="flex justify-center align-baseline items-baseline gap-3">
        <motion.div
          className="flex justify-center items-center content-center gap-2 max-md:items-start max-md:justify-start max-md:w-11/12 max-md:flex-wrap"
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <DatePicker
            onPanelChange={(props) => console.log("props", props)}
            picker="week"
            defaultValue={dayjs()}
            size={"large"}
            format={customWeekStartEndFormat}
            onSelect={onSelect} // Handle date selection if needed
          />
        </motion.div>
      </div>
      <Select
        style={{ width: 120 }}
        options={scheduleProps?.scheduleData?.map((item) => ({
          value: item.user.id,
          label: item.user.name,
        }))}
        loading={true}
        size={"large"}
        onChange={(value, options) => {
          !Array.isArray(options) && setSelectedUser(options);
        }}
        defaultValue={selectedUser}
        suffixIcon={<UserOutlined className="text-lg" />}
      />
      <div className="flex justify-center items-baseline gap-3">
        <div className="flex justify-center items-center gap-1"></div>
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
    </div>
  );
}

export default ListNav;

"use client";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function SearchByDate({
  onSearchChange,
  searchQuery,
}: {
  onSearchChange: (value: Dayjs) => void;
  searchQuery: Dayjs | null;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={"Search By Date"}
        closeOnSelect
        value={searchQuery}
        onChange={(e) => {
          e && onSearchChange(e);
        }}
        className="dark:text-white px-2 py-1 text-xl rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />
    </LocalizationProvider>
  );
}

export default SearchByDate;

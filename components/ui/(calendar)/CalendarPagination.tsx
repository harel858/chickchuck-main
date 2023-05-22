"use client";
import React, { useState } from "react";
import { ScheduleProps } from "../../../types/types";
import { usePagination } from "@mantine/hooks";
import { motion } from "framer-motion";
import ProfileImage from "@ui/(navbar)/ProfileImage";
import { Avatar } from "@mui/material";
const ITEMS_PER_PAGE = 2;

function CalendarPagination({
  scheduleProps,
}: {
  scheduleProps: ScheduleProps;
}) {
  const users = [
    "Ilan",
    "Noga",
    "Shalom",
    "Yoni",
    "Inbal",
    "Rona",
    "Yosi",
    "Yaron",
  ];
  const [visibleResults, setVisibleResults] = useState(
    users.slice(0, ITEMS_PER_PAGE)
  );
  const pagination = usePagination({
    total: Math.ceil(users.length / ITEMS_PER_PAGE),
    initialPage: 1,
    onChange(page) {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      setVisibleResults(users.slice(start, end));
    },
  });
  return (
    <div className="flex justify-center items-center content-center gap-5">
      <ul className="flex justify-center items-center gap-2">
        {scheduleProps.scheduleData.map((item) => (
          <motion.div
            key={item.user.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={pagination.next}
            className="flex items-center justify-center cursor-pointer border-2 border-cyan-900 hover:bg-cyan-900  hover:text-white w-max rounded-3xl pr-1 p-0 bg-white"
          >
            <Avatar
              alt="Profile Img"
              className="self-start"
              src={item.user.profileSrc || undefined}
            />
            <h6>{item.user.name}</h6>
          </motion.div>
        ))}
      </ul>
    </div>
  );
}
export default CalendarPagination;

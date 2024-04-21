"use client";
import React from "react";
import { motion } from "framer-motion";
import DetailsButton from "./EditButton";
import {
  ActivityDays,
  RequiredDocument,
  Treatment,
  User,
} from "@prisma/client";
import DeleteButton from "./DeleteButton";
export default function ClientItem({
  i,
  user,
}: {
  i: number;
  user: User & {
    activityDays?: ActivityDays[];
  };
}) {
  return (
    <motion.li
      key={i}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scaleX: 1.02 }}
      transition={{
        duration: 0.2,
        easeInOut: [0, 0.71, 0.2, 1.01],
      }}
      className={`w-1/3 max-lg:w-11/12 bg-slate-50 border border-gray-500 text-black rounded-xl relative px-5 py-7 flex-col justify-around items-center`}
    >
      <div className="flex flex-row gap-1 justify-between items-center w-full">
        <p className="font-sans font-semibold text-2xl w-max">{user.name}</p>
      </div>
      <div className="flex flex-row gap-1 justify-between items-center w-full">
        <p className="font-extralight text-lg">{user.UserRole}</p>
        <DetailsButton user={user} />
      </div>
    </motion.li>
  );
}

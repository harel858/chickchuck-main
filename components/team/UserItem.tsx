"use client";
import React from "react";
import { motion } from "framer-motion";
import DetailsButton from "./DetailsButton";
import { Treatment, User } from "@prisma/client";

export default function ClientItem({
  user,
  i,
  allServices,
}: {
  i: number;
  user: User & {
    Treatment: Treatment[];
  };
  allServices: Treatment[];
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
      className={`w-1/3 max-lg:w-11/12 hover:bg-gray-900 bg-slate-100 border border-gray-500 text-black cursor-pointer hover:text-white rounded-xl relative px-5 py-7 flex flex-row justify-between items-center group`}
    >
      <p className="font-sans font-semibold text-2xl w-max">{user.name}</p>
      <DetailsButton allServices={allServices} user={user} />
    </motion.li>
  );
}

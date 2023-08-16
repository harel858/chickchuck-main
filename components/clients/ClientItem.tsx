"use client";
import React from "react";
import { motion } from "framer-motion";
import { Appointment, Customer } from "@prisma/client";

export default function ClientItem({
  i,
  customer,
}: {
  i: number;
  customer: Customer & {
    appointments: Appointment[];
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
      className={`w-11/12 hover:bg-gray-900 bg-sky-200 border border-gray-500 text-black cursor-pointer hover:text-white rounded-2xl relative px-16 py-7  flex justify-between gap-10 items-center`}
    >
      <div className="flex flex-col gap-1 justify-center items-start">
        <p className="font-medium text-xl w-max">{customer.name}</p>
        <p className="font-thin text-lg">{customer.name}</p>
      </div>
      <p className="font-extralight text-lg">{customer.phoneNumber}</p>
    </motion.li>
  );
}

"use client";
import React from "react";
import { motion } from "framer-motion";
import DetailsButton from "./EditButton";
import { RequiredDocument, Treatment, User } from "@prisma/client";
import DeleteButton from "./DeleteButton";
export default function ClientItem({
  i,
  bussinesDocs,
  treatment,
}: {
  i: number;
  treatment: Treatment & {
    RequiredDocument?: RequiredDocument[];
  };
  bussinesDocs?: RequiredDocument[];
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
      className={`w-1/3 max-lg:w-11/12 hover:bg-gray-900 bg-slate-100 border border-gray-500 text-black cursor-pointer hover:text-white rounded-xl relative px-5 py-7 flex flex-col justify-around items-center gap-4 group`}
    >
      <div className="flex flex-row gap-1 justify-between items-center w-full">
        <p className="font-sans font-semibold text-2xl w-max">
          {treatment.title}
        </p>
        <DetailsButton treatment={treatment} bussinesDocs={bussinesDocs} />
      </div>
      <div className="flex flex-row gap-1 justify-between items-center w-full">
        <p className="font-semibold text-xl text-green-600">
          {treatment.cost}$
        </p>
        <DeleteButton treatment={treatment} bussinesDocs={bussinesDocs} />
      </div>
    </motion.li>
  );
}

"use client";
import React from "react";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { FaRegCalendarTimes } from "react-icons/fa";

function NoAppointments({ title }: { title: string }) {
  return (
    <div className="flex flex-1 flex-col border-t max-xl:border-0 gap-5 justify-center content-center items-center text-black">
      <Fade
        delay={250}
        cascade
        damping={0.02}
        className={`text-3xl max-sm:text-lg`}
      >
        {title}
      </Fade>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="pb-5"
      >
        <FaRegCalendarTimes className="text-9xl" />
      </motion.div>
    </div>
  );
}

export default NoAppointments;

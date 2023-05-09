"use client";
import React from "react";
import classes from "./style.module.css";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { FaRegCalendarTimes } from "react-icons/fa";

function NoAppointments() {
  return (
    <div className="flex flex-1 flex-col border-t border-gray-500 max-xl:border-0 gap-10 justify-center content-center items-center py-10 text-black">
      <Fade
        delay={250}
        cascade
        damping={0.02}
        className={`text-3xl max-sm:text-lg ${classes.robotoBold}`}
      >
        No Appointments For Today
      </Fade>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <FaRegCalendarTimes className="text-9xl" />
      </motion.div>
    </div>
  );
}

export default NoAppointments;

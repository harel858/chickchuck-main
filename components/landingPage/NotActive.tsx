"use client";
import React from "react";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { FaRegCalendarTimes } from "react-icons/fa";

function NotActive({ title }: { title: string }) {
  return (
    <div className="flex flex-1 flex-col border-t max-xl:border-0 gap-3 justify-center content-center items-center text-black">
      <Fade
        delay={250}
        cascade
        damping={0.05}
        className={`text-2xl max-sm:text-lg font-serif`}
      >
        {title}
      </Fade>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <FaRegCalendarTimes className="text-5xl" />
      </motion.div>
    </div>
  );
}

export default NotActive;

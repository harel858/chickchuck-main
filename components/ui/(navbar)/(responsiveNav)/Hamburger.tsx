"use client";
import classes from "./style.module.css";
import * as React from "react";
import { useRef } from "react";
import { motion, sync, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import { User } from "@prisma/client";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const Hamburger = ({ user }: { user: User }) => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.nav
      className={`${
        !isOpen ? `hidden pointer-events-none` : `flex`
      } fixed z-50 top-0 left-0 h-screen w-3/5 max-sm:flex pt-12 gap-12 hidden flex-col align-center items-center justify-start`}
      initial={true}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div
        className={`${classes.background} border-r border-gray-800 shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)]`}
        variants={sidebar}
      />
      <Navigation isOpen={isOpen} toggle={toggleOpen} user={user} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

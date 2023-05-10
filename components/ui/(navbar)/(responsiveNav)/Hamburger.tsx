"use client";
import classes from "./style.module.css";
import * as React from "react";
import { useRef } from "react";
import { motion, sync, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import { NavBarProps } from "../../../../types/types";
import { Avatar } from "@mui/material";

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

const variantHeader = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const Hamburger = ({
  user,
  lobster,
}: {
  user: NavBarProps;
  lobster: string;
}) => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.nav
      className={`${
        !isOpen ? `hidden pointer-events-none` : `flex`
      } fixed z-40 top-0 left-0 h-screen w-52 max-sm:flex pt-16 gap-10 hidden flex-col align-center items-center justify-start`}
      initial={true}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div
        variants={variantHeader}
        className=" flex justify-center content-center items-center gap-5 flex-col z-50 text-white"
      >
        <h2 className={` ${lobster} text-black  text-3xl w-max`}>Queue</h2>
        <Avatar alt="Profile Img" src={user.profileSrc || undefined} />
        <motion.h3
          className={`${
            !isOpen ? `hidden` : `block`
          }  text-black text-2xl min:text-xl  w-max `}
        >
          Hello, {user?.name}
        </motion.h3>
      </motion.div>
      <motion.div
        className={`${classes.background} border-r border-gray-800 shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)]`}
        variants={sidebar}
      />
      <Navigation lobster={lobster} isOpen={isOpen} user={user} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

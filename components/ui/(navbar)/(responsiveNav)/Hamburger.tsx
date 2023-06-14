"use client";
import classes from "./style.module.css";
import React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import { Avatar } from "@mui/material";
import { User } from "next-auth";
import { Lobster_Two } from "next/font/google";
const lobster = Lobster_Two({ weight: "400", subsets: ["latin"] });

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

const Hamburger = ({
  user,
}: {
  user: User & {
    id: string;
    UserRole: "CUSTOMER" | "RECIPIENT";
    urls: {
      backgroundImage: string;
      profileImage: string;
    } | null;
  };
}) => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.nav
      className={`${
        !isOpen ? `hidden pointer-events-none` : `flex`
      } fixed z-40 top-0 left-0 h-screen w-52 max-2xl:flex pt-16 gap-10 hidden flex-col align-center items-center justify-start`}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div
        variants={variantHeader}
        className=" flex justify-center content-center items-center gap-5 flex-col z-50 text-white"
      >
        <h2 className={`${lobster.className} text-black  text-3xl w-max`}>
          Queue
        </h2>
        <Avatar alt="Profile Img" src={user.urls?.profileImage || undefined} />
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
      <Navigation isOpen={isOpen} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
export default Hamburger;

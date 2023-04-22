"use client";
import classes from "./style.module.css";
import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { NavBarProps } from "../../../../types/types";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
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

export const Navigation = ({
  user,
  toggle,
  isOpen,
}: {
  user: NavBarProps;
  toggle: any;
  isOpen: boolean;
}) => {
  const itemIds = [
    { title: "Home", link: `/home`, icon: <HomeIcon /> },
    {
      title: "Schedule",
      link: `/schedule`,
      icon: <CalendarMonthIcon />,
    },
    {
      title: "Treatments",
      link: `/treatments`,
      icon: <AppRegistrationIcon />,
    },
    {
      title: "Activity Time",
      link: `/activityTime`,
      icon: <AccessTimeOutlinedIcon />,
    },
  ];
  return (
    <motion.ul
      className={` ${
        !isOpen ? `hidden` : `flex`
      } relative flex-col w-full pt-20 gap-1 justify-start items-center align-start text-black text-md max-sm:text-sm `}
      variants={variants}
    >
      <motion.h2
        variants={variantHeader}
        className={`${classes.h2} ${
          !isOpen ? `hidden` : `block`
        }  text-black absolute top-5  left-2 text-2xl min:text-xl  w-max `}
      >
        Hello {user.name}
      </motion.h2>
      {itemIds.map(
        (
          {
            icon,
            link,
            title,
          }: {
            title: string;
            link: string;
            icon: JSX.Element;
          },
          i
        ) => (
          <MenuItem i={i} icon={icon} link={link} title={title} key={i} />
        )
      )}
    </motion.ul>
  );
};

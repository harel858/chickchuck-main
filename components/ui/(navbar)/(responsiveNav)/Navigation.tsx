"use client";
import React from "react";
import NavItemWithLinks from "../NavItemWithLinks";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSchedule } from "react-icons/ai";
import { GiFeather } from "react-icons/gi";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = ({ isOpen }: { isOpen: boolean }) => {
  const itemIds = [
    { title: "profile", link: `/profile`, icon: <CgProfile /> },
    {
      title: "Schedule",
      link: `/schedule`,
      icon: <AiOutlineSchedule />,
    },
    {
      title: "Services",
      link: `/treatments`,
      icon: <GiFeather />,
    },
  ];
  return (
    <motion.ul
      className={` ${
        !isOpen ? `hidden` : `flex`
      } relative flex-col w-full gap-1 justify-start items-center align-start text-black text-md max-sm:text-sm`}
      variants={variants}
    >
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
      <NavItemWithLinks responsive={true} />
    </motion.ul>
  );
};

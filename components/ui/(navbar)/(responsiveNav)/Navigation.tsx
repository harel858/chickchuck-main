"use client";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { FiExternalLink } from "react-icons/fi";
import { IoCalendarOutline, IoSettingsOutline } from "react-icons/io5";
import { RiCoinsLine, RiTeamLine } from "react-icons/ri";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = ({
  isOpen,
  formattedBusinessName,
  locale,
}: {
  isOpen: boolean;
  formattedBusinessName: string;
  locale: string;
}) => {
  const itemIds = [
    {
      title: "יומן",
      link: `/${locale}/schedule`,
      icon: <IoCalendarOutline />,
    },
    { title: "שירותים", link: `/services`, icon: <RiCoinsLine /> },
    {
      title: "לקוחות",
      link: `/${locale}/clients`,
      icon: <CgProfile />,
    },
    {
      title: "צוות",
      link: `/${locale}/team`,
      icon: <RiTeamLine />,
    },
    {
      title: "דף העסק",
      link: `/${locale}/${formattedBusinessName}`,
      icon: <FiExternalLink />,
    },
    {
      title: "הגדרות",
      link: `/${locale}/profile`,
      icon: <IoSettingsOutline />,
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
    </motion.ul>
  );
};

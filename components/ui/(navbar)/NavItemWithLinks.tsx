"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBarItem from "./NavBarItem";
import { BiCaretDown } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";

const variantPro = {
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
export default function NavItemWithLink({
  responsive,
}: {
  responsive: boolean;
}) {
  const [isDisplayed, setIsDisplayed] = useState(false);

  return (
    <motion.div
      variants={variantPro}
      className={`w-full transition-all ease-in duration-200 hover:bg-black/30 ${
        isDisplayed && "bg-black/30"
      }`}
    >
      <button
        onClick={() => setIsDisplayed(!isDisplayed)}
        className={` relative flex justify-start gap-8 w-full group hover:bg-opacity-10 hover:bg-black/10 dark:hover:bg-white/10 border-t ${
          responsive ? "border-black/50" : "border-white/50"
        } overflow-hidden ${
          isDisplayed && ` dark:bg-white/10`
        } cursor-pointer p-4 my-0  after:absolute after:top-6 after:right-0 after:bottom-0 after:left-36 after:rounded-3xl after:rotate-45 after:h-2 after:w-5/12 after:content after:bg-sky-600 after:ease-in after:duration-200 after:scale-x-100`}
      >
        <BiCaretDown
          className={`${
            isDisplayed && "rotate-180"
          } transition-all duration-300 ease-in-out`}
        />
        <span
          className={` relative  ${
            responsive ? `text-black` : `text-white`
          } after:absolute after:bottom-0 after:mt-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-500 after:translate-y-1 after:scale-x-0 after:ease-in after:duration-200 ease-in duration-200 group-hover:after:scale-x-100 text-xl`}
        >
          PRO
        </span>
      </button>
      {isDisplayed && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{
            duration: 0.3,
            easeInOut: [0, 0.71, 0.2, 1.01],
          }}
        >
          <NavBarItem title={"Team"} link={"/team"} icon={<RiTeamLine />} />
          <NavBarItem title={"Team"} link={"/team"} icon={<RiTeamLine />} />
          <NavBarItem title={"Team"} link={"/team"} icon={<RiTeamLine />} />
        </motion.div>
      )}
    </motion.div>
  );
}

import classes from "./style.module.css";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const variants = {
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

export const MenuItem = ({
  icon,
  link,
  title,
  i,
}: {
  title: string;
  link: string;
  icon: JSX.Element;
  i: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <motion.li
      className={`flex z-30 justify-around gap-8 w-full group hover:bg-opacity-10 hover:bg-black ${
        isActive && `bg-opacity-10 bg-black`
      } cursor-pointer py-4 px-1 my-0`}
      variants={variants}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        router.push(link);
      }}
    >
      <div
        className={`text-black self-center transition-all ease-in duration-200 scale-125 group-hover:scale-150 ${
          isActive && `scale-150`
        } `}
      >
        {icon}
      </div>
      <Link
        href={link}
        className={`relative w-full ${classes.roboto} ${
          isActive ? `font-extrabold` : `font-normal`
        } after:absolute after:bottom-0 after:mt-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-600 after:translate-y-1 after:scale-x-0 after:ease-in after:duration-200 ease-in duration-200 group-hover:after:scale-x-100 text-xl`}
      >
        {title}
      </Link>
    </motion.li>
  );
};

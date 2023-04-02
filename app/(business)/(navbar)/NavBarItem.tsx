"use client";
import React from "react";
import classes from "./style.module.css";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface NavItemProps {
  title: string;
  link: string;
  icon: JSX.Element;
}

function NavBarItem({ title, link, icon }: NavItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <li
      className={`flex justify-start gap-8 w-full group hover:bg-opacity-10 hover:bg-black ${
        isActive && `bg-opacity-10 bg-black`
      } cursor-pointer p-4 my-0 transition-all ease-in duration-200`}
      onClick={() => router.push(link)}
    >
      <div
        className={`text-black self-center transition-all ease-in duration-200 group-hover:scale-125 ${
          isActive && `scale-125`
        } text-xl`}
      >
        {icon}
      </div>
      <Link
        href={link}
        className={`relative ${classes.slabo} ${
          isActive ? `font-extrabold ` : `font-normal`
        } after:absolute after:bottom-0 after:mt-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-800 after:translate-y-1 after:scale-x-0 after:ease-in after:duration-200 ease-in duration-200 group-hover:after:scale-x-100 xl:text-xl md:text:md`}
      >
        {title}
      </Link>
    </li>
  );
}

export default NavBarItem;

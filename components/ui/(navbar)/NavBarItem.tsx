"use client";
import React from "react";
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
  console.log(link);

  return (
    <li
      className={`px-4 h-full flex flex-col justify-end gap-2 border-white/30 w-full group hover:bg-opacity-10 hover:bg-gray-500/10 dark:hover:bg-white/10 cursor-pointer my-0 transition-all ease-in duration-200`}
      onClick={() => router.push(link)}
    >
      <div
        className={`self-center transition-all ease-in duration-200 scale-125 group-hover:scale-150 ${
          isActive && `scale-150`
        } text-xl text-black`}
      >
        {icon}
      </div>
      <div
        className={`text-black relative ${
          isActive ? `font-medium ` : `font-light`
        } w-max after:absolute after:bottom-0 after:mt-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-500 after:translate-y-1 after:scale-x-0 after:ease-in after:duration-200 ease-in duration-200 group-hover:after:scale-x-125 ${
          isActive && "after:scale-x-125"
        } text-lg`}
      >
        {title}
      </div>
    </li>
  );
}

export default NavBarItem;

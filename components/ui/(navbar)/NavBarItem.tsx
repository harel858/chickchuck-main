"use client";
import React from "react";
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
      className={`flex justify-start gap-8 w-full group hover:bg-opacity-10 hover:bg-black/10 dark:hover:bg-white/10 ${
        isActive && `bg-black/10 dark:bg-white/10`
      } cursor-pointer p-4 my-0 transition-all ease-in duration-200`}
      onClick={() => router.push(link)}
    >
      <div
        className={`self-center transition-all ease-in duration-200 scale-125 group-hover:scale-150 ${
          isActive && `scale-150`
        } text-xl text-white`}
      >
        {icon}
      </div>
      <Link
        href={link}
        className={`text-white relative ${
          isActive ? `font-medium ` : `font-light`
        } after:absolute after:bottom-0 after:mt-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-500 after:translate-y-1 after:scale-x-0 after:ease-in after:duration-200 ease-in duration-200 group-hover:after:scale-x-100 text-xl`}
      >
        {title}
      </Link>
    </li>
  );
}

export default NavBarItem;

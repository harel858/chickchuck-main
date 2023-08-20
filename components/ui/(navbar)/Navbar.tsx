"use client";
import React from "react";
import { ThemeToggle } from "@components/ThemeToggle";
import Notification from "./specialOperations/Notification";
import { Session } from "next-auth";
import Hamburger from "./(responsiveNav)/Hamburger";
import { Lobster_Two } from "next/font/google";
const lobster = Lobster_Two({ weight: "400", subsets: ["latin"] });

function Navbar({ session }: { session: Session }) {
  return (
    <nav className="pl-64 max-2xl:p-0 fixed backdrop-blur-sm bg-orange-200/70 dark:bg-gray-900/95 z-40 top-0 left-0 right-0 h-20 border-b border-gray-900 dark:border-slate-800 shadow-sm flex items-center justify-center">
      <h1
        className={`${lobster.className} dark:text-white text-black text-4xl w-max `}
      >
        QuickQ.
      </h1>
      <Hamburger user={session.user} />
      <div className="flex flex-row justify-center items-center absolute right-2">
        <Notification />
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;

"use client";
import React from "react";
import { ThemeToggle } from "@components/ThemeToggle";
import Notifications from "./specialOperations/Notifications";
import { Session } from "next-auth";
import Hamburger from "./(responsiveNav)/Hamburger";
import { Lobster_Two } from "next/font/google";
import { Appointment } from "@prisma/client";
const lobster = Lobster_Two({ weight: "400", subsets: ["latin"] });

function Navbar({
  session,
  appointments,
}: {
  session: Session;
  appointments: Appointment[];
}) {
  const userId = session.user.id;
  return (
    <nav className="pl-64 max-2xl:p-0 fixed backdrop-blur-sm bg-orange-200/70 dark:bg-gray-900/95 z-40 top-0 left-0 right-0 h-20 border-b border-gray-900 dark:border-slate-800 shadow-sm flex items-center justify-center">
      <h1
        className={`${lobster.className} dark:text-white text-black text-4xl w-max `}
      >
        QSync.
      </h1>
      <Hamburger user={session.user} />
      <div className="flex flex-row justify-center items-center absolute right-2">
        <Notifications appointments={appointments} userId={session.user.id} />
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;

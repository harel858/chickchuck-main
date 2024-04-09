"use client";
import React from "react";
import Notifications from "./specialOperations/notifications/Notifications";
import { Session } from "next-auth";
import { Lobster_Two } from "next/font/google";
import { User, Account, Customer } from "@prisma/client";
import NavBarItem from "./NavBarItem";
import { FaBusinessTime } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { AiOutlineSchedule } from "react-icons/ai";
import { RiCoinsLine, RiTeamLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Avatar from "@ui/Avatar";
import { calendar_v3 } from "googleapis";
const lobster = Lobster_Two({ weight: "400", subsets: ["latin"] });

function Navbar({
  session,
  scheduleProps,
  user,
  link,
  watchExpired,
  customers,
}: {
  session: Session;
  link: string;
  scheduleProps: calendar_v3.Schema$Events | null;
  user: User & { accounts: Account[] };
  watchExpired: any;
  customers: Customer[];
}) {
  console.log("watchExpired", watchExpired);

  const profileImage = session.user.image;
  const formattedBusinessName = session.user.businessName?.replace(/\s+/g, "-"); // Replace whitespace with hyphens
  /*     ?.replace(/[^\w\-]+/g, ""); // Remove or replace non-alphanumeric characters except hyphens
   */
  return (
    <nav className="fixed p-0 flex items-center justify-center max-2xl:p-0 backdrop-blur-sm bg-slate-300 dark:bg-gray-900/95 z-40 top-0 left-0 right-0 h-20 border-b border-slate-200 dark:border-slate-800 shadow-sm ">
      <ul className="max-xl:hidden h-full flex flex-row justify-between items-center align-between text-md text-white dark:text-white">
        <NavBarItem
          title={"Online Profile"}
          link={formattedBusinessName}
          icon={<FiExternalLink />}
        />
        <NavBarItem
          title={"Schedule"}
          link={`/schedule`}
          icon={<AiOutlineSchedule />}
        />
        <NavBarItem
          title={"Services"}
          link={`/services`}
          icon={<RiCoinsLine />}
        />
        <NavBarItem title={"Clients"} link={"/clients"} icon={<CgProfile />} />
        <NavBarItem title={"Team"} link={"/team"} icon={<RiTeamLine />} />
        <NavBarItem
          title={"Bussiness Profile"}
          link={`/profile`}
          icon={<FaBusinessTime />}
        />
      </ul>
      <div className="flex flex-row justify-between items-center gap-4 absolute right-2">
        <Notifications
          scheduleProps={scheduleProps}
          session={session}
          userId={session.user.id}
          customers={customers}
        />
        <Avatar alt="Profile Img" src={profileImage} />
      </div>
    </nav>
  );
}

export default Navbar;

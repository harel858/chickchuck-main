"use client";
import React from "react";
import Notifications from "./specialOperations/notifications/Notifications";
import { Session } from "next-auth";
import { Lobster_Two } from "next/font/google";
import { User, Account, Customer } from "@prisma/client";
import NavBarItem from "./NavBarItem";
import { FiExternalLink } from "react-icons/fi";
import { RiCoinsLine, RiTeamLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Avatar from "@ui/Avatar";
import { calendar_v3 } from "googleapis";
import { IoSettingsOutline, IoCalendarOutline } from "react-icons/io5";
import Hamburger from "./(responsiveNav)/Hamburger";
const lobster = Lobster_Two({ weight: "400", subsets: ["latin"] });

function Navbar({
  session,
  scheduleProps,
  user,
  customers,
}: {
  session: Session;
  scheduleProps: calendar_v3.Schema$Events["items"] | null;
  user: User & { accounts: Account[] };
  customers: Customer[];
}) {
  const profileImage = session.user.image;
  console.log("profileImage", profileImage);

  const formattedBusinessName = session.user.businessName?.replace(/\s+/g, "-"); // Replace whitespace with hyphens

  return (
    <nav className="fixed px-0 py-1 flex items-center justify-center max-2xl:p-0 backdrop-blur-sm bg-slate-300 dark:bg-gray-900/95 z-40 top-0 left-0 right-0 h-20 border-b border-slate-200 dark:border-slate-800 shadow-sm ">
      <ul className="max-xl:hidden h-full flex flex-row justify-between items-center align-between text-md text-white dark:text-white">
        <NavBarItem
          title={"דף העסק"}
          link={formattedBusinessName}
          icon={<FiExternalLink />}
        />
        {session.user.isAdmin ? (
          <>
            <NavBarItem
              title={"יומן"}
              link={`/schedule`}
              icon={<IoCalendarOutline />}
            />
            <NavBarItem
              title={"שירותים"}
              link={`/services`}
              icon={<RiCoinsLine />}
            />
            <NavBarItem
              title={"לקוחות"}
              link={"/clients"}
              icon={<CgProfile />}
            />
            <NavBarItem title={"צוות"} link={"/team"} icon={<RiTeamLine />} />
            <NavBarItem
              title={"הגדרות"}
              link={`/profile`}
              icon={<IoSettingsOutline />}
            />
          </>
        ) : (
          <></>
        )}
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

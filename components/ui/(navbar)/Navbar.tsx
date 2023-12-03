"use client";
import React from "react";
import Notifications from "./specialOperations/notifications/Notifications";
import { Session } from "next-auth";
import Hamburger from "./(responsiveNav)/Hamburger";
import { Lobster_Two } from "next/font/google";
import {
  Appointment,
  AppointmentSlot,
  Customer,
  Treatment,
} from "@prisma/client";
import NavBarItem from "./NavBarItem";
import { FaBusinessTime } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { AiOutlineSchedule } from "react-icons/ai";
import { RiCoinsLine, RiTeamLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Avatar from "@ui/Avatar";
const lobster = Lobster_Two({ weight: "400", subsets: ["latin"] });

function Navbar({ session, link }: { session: Session; link: string }) {
  /*   const profileImage = session.user.urls?.profileImage; */

  return (
    <nav className="fixed p-0 flex items-center justify-center max-2xl:p-0 backdrop-blur-sm bg-slate-200/70 dark:bg-gray-900/95 z-40 top-0 left-0 right-0 h-20 border-b border-slate-200 dark:border-slate-800 shadow-sm ">
      <ul className="max-xl:hidden h-full flex flex-row justify-between items-center align-between text-md text-white dark:text-white">
        <NavBarItem
          title={"Online Profile"}
          link={link}
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
      {/*       <Hamburger user={session.user} />
       */}{" "}
      <div className="flex flex-row justify-between items-center gap-4 absolute right-2">
        <Notifications userId={session.user.id} />
        <Avatar alt="Profile Img" src={undefined} />
      </div>
    </nav>
  );
}

export default Navbar;

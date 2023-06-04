"use client";
import React from "react";
import NavBarItem from "./NavBarItem";
import { AiOutlineSchedule } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GiFeather } from "react-icons/gi";
import NavItemWithLinks from "./NavItemWithLinks";
import NavHead from "./NavHead";
import { User } from "next-auth";

function VerticalNav({
  user,
}: {
  user: User & {
    id: string;
    UserRole: "RECIPIENT" | "CUSTOMER";
  };
}) {
  return (
    <nav className="fixed top-0 h-screen w-52 max-md:hidden  shadow-sm shadow-black/20 pt-9 gap-10 flex flex-col align-center items-center justify-start bg-gray-600 dark:bg-neutral-700 dark:text-blue-50 border-r border-gray-800 z-50">
      <NavHead user={user} />
      <ul className="flex flex-col w-full gap-1 justify-start items-center align-between text-md text-white dark:text-white">
        <NavBarItem title={"Profile"} link={`/profile`} icon={<CgProfile />} />
        <NavBarItem
          title={"Schedule"}
          link={`/schedule`}
          icon={<AiOutlineSchedule />}
        />
        <NavBarItem
          title={"Services"}
          link={`/services`}
          icon={<GiFeather />}
        />

        <NavItemWithLinks responsive={false} />
      </ul>
    </nav>
  );
}

export default VerticalNav;

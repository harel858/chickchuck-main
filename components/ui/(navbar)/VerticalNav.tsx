"use client";
import React from "react";
import NavBarItem from "./NavBarItem";
import { AiOutlineSchedule } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GiFeather } from "react-icons/gi";
import ProfileImage from "./ProfileImage";
import { User } from "@prisma/client";
import NavItemWithLinks from "./NavItemWithLinks";
import { Avatar } from "@mui/material";

function VerticalNav({ user, lobster }: { user: User; lobster: string }) {
  return (
    <nav className="fixed top-0 h-screen w-52 max-sm:hidden  shadow-sm shadow-black/20 pt-9 gap-10 flex flex-col align-center items-center justify-start bg-gray-600 dark:bg-neutral-700 dark:text-blue-50 border-r border-gray-800 z-50">
      <div className="relative top-0 left-0 flex justify-center content-center items-center gap-5 flex-col z-50 text-white">
        <h2
          className={` ${lobster}  dark:text-white text-white  xl:text-4xl md:text-3xl sm:text-2xl w-max`}
        >
          Queue
        </h2>
        <Avatar alt="Profile Img" src={user.profileSrc || undefined} />
        <h3
          className={`dark:text-white text-white font-medium  xl:text-xl md:text-lg sm:text-md w-max `}
        >
          Hello, {user?.name}
        </h3>
      </div>
      <ul className="flex flex-col w-full gap-1 justify-start items-center align-between text-md text-white dark:text-white">
        <NavBarItem title={"Profile"} link={`/profile`} icon={<CgProfile />} />
        <NavBarItem
          title={"Schedule"}
          link={`/schedule`}
          icon={<AiOutlineSchedule />}
        />
        <NavBarItem
          title={"Services"}
          link={`/treatments`}
          icon={<GiFeather />}
        />

        <NavItemWithLinks responsive={false} />
      </ul>
    </nav>
  );
}

export default VerticalNav;

"use client";
import React from "react";
import NavBarItem from "./NavBarItem";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { HomeIcon } from "lucide-react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ProfileImage from "./ProfileImage";
import { User } from "@prisma/client";

function VerticalNav({ user, lobster }: { user: User; lobster: string }) {
  return (
    <nav className="fixed top-0 h-screen w-max max-sm:hidden  shadow-sm shadow-black/20 pt-12 gap-0 flex flex-col align-center items-center justify-start bg-blue-200 border-r border-gray-800 z-50">
      <div className="relative top-0 left-0 flex justify-center content-center items-center gap-5 flex-col z-50">
        <h2
          className={` ${lobster} text-black  xl:text-4xl md:text-3xl sm:text-2xl w-max `}
        >
          Queue
        </h2>
        <ProfileImage user={user} />
        <h3
          className={`  font-medium text-black  xl:text-xl md:text-lg sm:text-md w-max `}
        >
          Hello {user?.name}
        </h3>
      </div>
      <ul className="flex flex-col w-full pt-20 gap-1 justify-start items-center align-between text-black text-md ">
        <NavBarItem title={"Home"} link={`/home`} icon={<HomeIcon />} />
        <NavBarItem
          title={"Schedule"}
          link={`/schedule`}
          icon={<CalendarMonthIcon />}
        />
        <NavBarItem
          title={"Treatments"}
          link={`/treatments`}
          icon={<AppRegistrationIcon />}
        />
        <NavBarItem
          title={"Activity Time"}
          link={`/activityTime`}
          icon={<AccessTimeOutlinedIcon />}
        />
      </ul>
    </nav>
  );
}

export default VerticalNav;

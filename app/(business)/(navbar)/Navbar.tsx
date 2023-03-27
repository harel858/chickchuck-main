"use client";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import classes from "./style.module.css";
import { SessionData } from "../../../types";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import NavBarItem from "./NavBarItem";
import { User } from "@prisma/client";
import { notFound } from "next/navigation";

function NavBar({ user }: { user: User }) {
  console.log(user);
  const value = user.businessName.replace(/ /g, "-");

  return (
    <nav className="fixed top-0 h-screen w-max max-sm:hidden border-r-[1.2px] border-white shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)] pt-12 gap-12 flex flex-col align-center items-center justify-start bg-gray-800">
      <h2
        className={`${classes.h2} text-white xl:text-3xl md:text-2xl sm:text-2xl w-max p-4`}
      >
        Hello {user.name}
      </h2>
      <ul className="flex flex-col w-full gap-1 justify-start items-center align-between text-white text-md">
        <NavBarItem
          title={"Home"}
          link={`/home/${value}`}
          icon={<HomeIcon />}
        />
        <NavBarItem
          title={"Schedule"}
          link={`/schedule/${value}`}
          icon={<CalendarMonthIcon />}
        />
        <NavBarItem
          title={"Treatments"}
          link={`/treatments/${user.id}`}
          icon={<AppRegistrationIcon />}
        />
        <NavBarItem
          title={"Activity Time"}
          link={`/activityTime/${user.id}`}
          icon={<AccessTimeOutlinedIcon />}
        />
      </ul>
    </nav>
  );
}

export default NavBar;

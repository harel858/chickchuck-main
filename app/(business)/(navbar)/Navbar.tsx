"use client";
import React, { useState } from "react";
import classes from "./style.module.css";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import NavBarItem from "./NavBarItem";
import HorizontalNav from "./HorizontalNav";
import { User } from "@prisma/client";
import { Hamburger } from "./(responsiveNav)/Hamburger";
import ProfileImage from "./ProfileImage";

function NavBar({ user }: { user: User }) {
  console.log(user);
  const value = user.businessName.replace(/ /g, "-");

  return (
    <>
      <Hamburger user={user} />
      <HorizontalNav user={user} />
      <nav className="fixed top-0 h-screen w-max max-sm:hidden  shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)] pt-12 gap-12 flex flex-col align-center items-center justify-start bg-white/60 border-r border-gray-800">
        <div className="relative top-20 left-0 flex justify-center content-center items-center gap-5 flex-col">
          <h2
            className={`${classes.h2} text-black  xl:text-4xl md:text-3xl sm:text-2xl w-max `}
          >
            Queue
          </h2>
          <ProfileImage />
          <h3
            className={`${classes.roboto} font-medium text-black  xl:text-2xl md:text-lg sm:text-md w-max `}
          >
            Hello {user.name}
          </h3>
        </div>
        <ul className="flex flex-col w-full pt-20 gap-1 justify-start items-center align-between text-black text-md ">
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
            link={`/treatments/${value}`}
            icon={<AppRegistrationIcon />}
          />
          <NavBarItem
            title={"Activity Time"}
            link={`/activityTime/${value}`}
            icon={<AccessTimeOutlinedIcon />}
          />
        </ul>
      </nav>
    </>
  );
}

export default NavBar;

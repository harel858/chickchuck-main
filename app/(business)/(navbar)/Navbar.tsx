"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { SessionData } from "../../../types";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Lobster } from "@next/font/google";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import NavBarItem from "./NavBarItem";
import { useRouter } from "next/navigation";

const font = Lobster({
  subsets: ["latin"],
  weight: "400",
});
const googleFont = font.className;

function NavBar() {
  const { data } = useSession();
  const router = useRouter();

  console.log(data);
  if (!googleFont) router.refresh();

  const SessionData = data as SessionData;

  return (
    data && (
      <nav className="fixed top-0 h-screen w-max max-sm:hidden border-r-[1.2px] border-white shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)] pt-12 gap-12 flex flex-col align-center items-center justify-start bg-gray-800">
        <h2
          className={`${googleFont} text-white xl:text-3xl md:text-2xl sm:text-2xl w-max p-4`}
        >
          Hello {SessionData?.user?.name}
        </h2>
        <ul className="flex flex-col w-full gap-1 justify-start items-center align-between text-white text-md">
          <NavBarItem
            title={"Home"}
            link={"/home"}
            icon={
              <HomeIcon className="text-white self-center transition-all ease-in duration-200 group-hover:scale-125" />
            }
          />
          <NavBarItem
            title={"Schedule"}
            link={`/schedule/${SessionData?.user?.id}`}
            icon={
              <CalendarMonthIcon className="text-white self-center transition-all ease-in duration-200 group-hover:scale-125 text-xl" />
            }
          />
          <NavBarItem
            title={"Treatments"}
            link={`/treatments/${SessionData?.user?.id}`}
            icon={
              <AppRegistrationIcon className="text-white self-center transition-all ease-in duration-200 group-hover:scale-125 text-xl" />
            }
          />
          <NavBarItem
            title={"Activity Time"}
            link={`/activityTime/${SessionData?.user?.id}`}
            icon={
              <AccessTimeOutlinedIcon className="text-white self-center transition-all ease-in duration-200 group-hover:scale-125 text-xl" />
            }
          />
        </ul>
      </nav>
    )
  );
}

export default NavBar;

"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useMemo } from "react";
import { SessionData } from "../../types";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useRouter, usePathname } from "next/navigation";
import { Lobster } from "@next/font/google";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const font = Lobster({
  subsets: ["latin"],
  weight: "400",
});

function NavBar() {
  const { data }: any = useSession();
  const SessionData = data as SessionData;
  const router = useRouter();
  const pathname = usePathname();

  const links = useMemo(
    () => [
      {
        title: "Home",
        link: "/home",
        icon: (
          <HomeIcon className="text-white self-center transition-all ease-in duration-200 group-hover:scale-125" />
        ),
      },
      {
        title: "Schedule",
        link: `/schedule/${SessionData?.user?.id}`,
        icon: (
          <CalendarMonthIcon className="text-white self-center transition-all ease-in duration-200 group-hover:scale-125 text-xl" />
        ),
      },
      {
        title: "Treatments",
        link: `/treatments/${SessionData?.user?.id}`,
        icon: (
          <AppRegistrationIcon className="text-white self-center transition-all ease-in duration-200 group-hover:scale-125 text-xl" />
        ),
      },
      {
        title: "Activity Time",
        link: `/activityTime/${SessionData?.user?.id}`,
        icon: (
          <AccessTimeOutlinedIcon className="text-white self-center transition-all ease-in duration-200 group-hover:scale-125 text-xl" />
        ),
      },
    ],
    [SessionData?.user?.id]
  );

  return (
    <nav className="fixed top-0 h-screen w-max max-sm:hidden border-r-[1.2px] border-white shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)] pt-12 gap-12 flex flex-col align-center items-center justify-start bg-gray-800">
      <h2
        className={`${font.className} text-white xl:text-3xl md:text-2xl sm:text-2xl w-max p-4`}
      >
        Hello {SessionData?.user?.name}
      </h2>
      <ul className="flex flex-col w-full gap-1 justify-start items-center align-between text-white text-md">
        {links.map((item, i) => {
          const isActive = pathname === item.link;

          return (
            <li
              key={i}
              className="flex justify-start gap-8 w-full group hover:bg-opacity-10 hover:bg-white cursor-pointer p-4 my-0 transition-all ease-in duration-200"
              onClick={() => router.push(item.link)}
            >
              {item.icon}
              <Link
                href={item.link}
                className={`relative ${
                  isActive ? `font-semibold` : `font-light`
                } after:absolute after:bottom-0 after:mt-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-500 after:translate-y-1 after:scale-x-0 after:ease-in after:duration-200 ease-in duration-200 group-hover:after:scale-x-100 xl:text-xl md:text:md`}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;

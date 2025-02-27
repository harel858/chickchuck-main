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
import { IoSettingsOutline, IoCalendarOutline } from "react-icons/io5";
import logo from "@public/QuickLinelogotemp3.png";
import { CombinedEvent } from "types/types";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
const lobster = Lobster_Two({ weight: "400", subsets: ["latin"] });

function Navbar({
  session,
  scheduleProps,
  user,
  customers,
  confirmationNeeded,
  access_token,
  locale,
}: {
  session: Session;
  scheduleProps: CombinedEvent[];
  user: User & { accounts: Account[] };
  customers: Customer[];
  locale: string;
  confirmationNeeded: boolean | null;
  access_token: string;
}) {
  const t = useTranslations("navbar");

  const profileImage = session.user.image;
  const formattedBusinessName = session.user.businessName?.replace(/\s+/g, "-");
  console.log("locale", locale);

  return (
    <nav className="fixed px-6 py-3 flex items-center justify-between backdrop-blur-md bg-gray-100 dark:bg-gray-900 z-50 top-0 left-0 right-0 h-20 border-b border-gray-300 dark:border-gray-700 shadow-md">
      <div className="flex items-center pointer-events-none -z-0">
        <Image
          width={180}
          height={180}
          className="mr-4 pointer-events-none -z-0"
          alt="logo"
          aria-hidden="true"
          src={logo.src}
        />
      </div>

      <ul className="hidden xl:flex flex-row justify-between items-center text-lg text-gray-900 dark:text-white gap-6">
        <NavBarItem
          title={t("onlinePage")}
          link={`/${locale}/${formattedBusinessName}`}
          icon={<FiExternalLink />}
        />
        {session.user.isAdmin && (
          <>
            <NavBarItem
              title={t("schedule")}
              link={`/${locale}/schedule`}
              icon={<IoCalendarOutline />}
            />
            <NavBarItem
              title={t("services")}
              link={`/${locale}/services`}
              icon={<RiCoinsLine />}
            />
            <NavBarItem
              title={t("clients")}
              link={`/${locale}/clients`}
              icon={<CgProfile />}
            />
            <NavBarItem
              title={t("team")}
              link={`/${locale}/team`}
              icon={<RiTeamLine />}
            />
            <NavBarItem
              title={t("settings")}
              link={`/${locale}/profile`}
              icon={<IoSettingsOutline />}
            />
          </>
        )}
      </ul>

      <div className="flex items-center gap-5">
        <Notifications
          scheduleProps={scheduleProps}
          session={session}
          userId={session.user.id}
          calendarId={user.calendarId}
          customers={customers}
          confirmationNeeded={confirmationNeeded}
          access_token={access_token}
        />
        <Avatar alt="Profile Img" src={profileImage} />
      </div>
    </nav>
  );
}

export default Navbar;

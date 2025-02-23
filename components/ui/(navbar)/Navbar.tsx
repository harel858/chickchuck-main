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

  const formattedBusinessName = session.user.businessName?.replace(/\s+/g, "-"); // Replace whitespace with hyphens
  console.log("locale", locale);

  return (
    <nav className="fixed px-4 py-2 flex items-center justify-between backdrop-blur-sm bg-gradient-to-r from-orange-200 via-orange-50 to-orange-200 dark:bg-amber-900/95 z-40 top-0 left-0 right-0 h-20 border-b border-gray-300 dark:border-amber-700 shadow-sm">
      <div className="flex items-center">
        <Image
          width={200}
          height={200}
          className="mr-4"
          alt="logo"
          aria-hidden="true"
          src={logo.src}
        />
        {/*      <span className="text-xl font-bold text-white dark:text-white">
          {t("title")}
        </span> */}
      </div>

      <ul className="hidden xl:flex flex-row justify-between items-center text-md text-white dark:text-white">
        <NavBarItem
          title={t("onlinePage")}
          link={formattedBusinessName}
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

      <div className="flex items-center gap-4">
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

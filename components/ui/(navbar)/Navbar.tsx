"use client";
import classes from "./style.module.css";
import { lazy, Suspense } from "react";
import { ThemeToggle } from "@components/ThemeToggle";
import { buttonVariants } from "@ui/Button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { BsPersonCircle } from "react-icons/bs";
import PlusButton from "./specialOperations/plusButton/PlusButton";
import Notification from "./specialOperations/Notification";
import { BusinessData } from "types/types";

const Hamburger = lazy(() => import("./(responsiveNav)/Hamburger"));

function Navbar({ businessData }: { businessData: BusinessData }) {
  const session = useSession();

  return (
    <nav className="fixed backdrop-blur-sm bg-orange-100/70 dark:bg-gray-900/95 z-40 top-0 left-0 right-0 h-20 border-b border-gray-900 dark:border-slate-800 shadow-sm flex items-center justify-between">
      <div className="w-full px-5 flex justify-end items-center gap-5">
        {session?.data?.user.UserRole === "RECIPIENT" && (
          <Suspense
            fallback={
              <div
                className={`${classes.background} border-r border-gray-800 shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)]`}
              />
            }
          >
            <Hamburger user={session.data.user} />
          </Suspense>
        )}
        <PlusButton businessData={businessData} />
        <Notification />
        <ThemeToggle />
        {session?.data?.user.UserRole === "RECIPIENT" && (
          <Link
            className={`${buttonVariants({
              variant: "ghost",
            })} flex flex-row-reverse justify-center gap-2 items-center text-base hover:bg-slate-100`}
            href="/signin"
          >
            Sign Out <BsPersonCircle className="text-3xl" />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

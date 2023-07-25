"use client";
import classes from "./style.module.css";
import { lazy, Suspense } from "react";
import { ThemeToggle } from "@components/ThemeToggle";
import { buttonVariants } from "@ui/Button";
import Link from "next/link";
import SignOutBtn from "@ui/SignOutBtn";
import { useSession } from "next-auth/react";
const Hamburger = lazy(() => import("./(responsiveNav)/Hamburger"));

function Navbar() {
  const session = useSession();

  return (
    <nav className="fixed backdrop-blur-sm bg-sky-500 dark:bg-gray-900/95 z-40 top-0 left-0 right-0 h-20 border-b border-gray-900 dark:border-slate-800 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-end items-center">
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
        {session?.data?.user.UserRole !== "RECIPIENT" && (
          <Link href="/" className={buttonVariants({ variant: "link" })}>
            Queue
          </Link>
        )}

        <div className="md:hidden">
          <ThemeToggle />
        </div>

        <div className="hidden md:flex gap-4">
          <ThemeToggle />
          {session?.data?.user.UserRole === "RECIPIENT" && (
            <Link
              className={buttonVariants({ variant: "default" })}
              href="/signin"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

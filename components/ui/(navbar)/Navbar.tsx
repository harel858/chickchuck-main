"use client";
import { ThemeToggle } from "@components/ThemeToggle";
import { buttonVariants } from "@ui/Button";
import Link from "next/link";
import { Hamburger } from "./(responsiveNav)/Hamburger";
import SignOutBtn from "@ui/SignOutBtn";
import { Lobster_Two } from "@next/font/google";
import { useSession } from "next-auth/react";

const lobster = Lobster_Two({ weight: "400", subsets: ["latin"] });

function Navbar() {
  const session = useSession();

  return (
    <div className="fixed backdrop-blur-sm bg-sky-600/75 dark:bg-gray-900/95 z-40 top-0 left-0 right-0 h-20 border-b border-sky-300 dark:border-slate-800 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-end items-center">
        {session?.data?.user.UserRole === "RECIPIENT" && (
          <Hamburger lobster={lobster.className} user={session.data.user} />
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
          <Link
            href="/documentation"
            className={buttonVariants({ variant: "ghost" })}
          >
            Documentation
          </Link>
          {session?.data?.user.UserRole === "RECIPIENT" ? (
            <>
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/profile"
              >
                Dashboard
              </Link>
              <SignOutBtn />
            </>
          ) : (
            <Link
              className={buttonVariants({ variant: "default" })}
              href="/signin"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

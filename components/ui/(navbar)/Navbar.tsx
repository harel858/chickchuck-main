import classes from "./style.module.css";
import { lazy, Suspense } from "react";
import { ThemeToggle } from "@components/ThemeToggle";
import Notification from "./specialOperations/Notification";
import { Session } from "next-auth";
const Hamburger = lazy(() => import("./(responsiveNav)/Hamburger"));

async function Navbar({ session }: { session: Session }) {
  return (
    <nav className="fixed backdrop-blur-sm bg-orange-200/70 dark:bg-gray-900/95 z-40 top-0 left-0 right-0 h-20 border-b border-gray-900 dark:border-slate-800 shadow-sm flex items-center justify-between">
      <div className="w-full px-5 flex justify-end items-center gap-5">
        {session?.user.UserRole === "RECIPIENT" && (
          <Suspense
            fallback={
              <div
                className={`${classes.background} border-r border-gray-800 shadow-[0_35px_60px_10px_rgba(0,0,0,0.3)]`}
              />
            }
          >
            <Hamburger user={session.user} />
          </Suspense>
        )}
        <Notification />
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;

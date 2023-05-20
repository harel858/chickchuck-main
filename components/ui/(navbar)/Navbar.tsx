import { ThemeToggle } from "@components/ThemeToggle";
import prisma from "@lib/prisma";
import { Button, buttonVariants } from "@ui/Button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { NavBarProps } from "../../../types/types";
import { Hamburger } from "./(responsiveNav)/Hamburger";
import SignOutBtn from "@ui/SignOutBtn";
import { Lobster_Two } from "@next/font/google";
const lobster = Lobster_Two({ weight: "400", subsets: ["latin"] });

async function fetchUser(email: string | null | undefined) {
  try {
    if (!email) return null;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { Business: true },
    });
    return {
      ...user,
      Business: user?.Business[0],
      profileSrc: undefined,
    } as NavBarProps;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const Navbar = async () => {
  const session = await getServerSession();
  const user = await fetchUser(session?.user?.email);

  return (
    <div className="fixed backdrop-blur-sm bg-sky-600/75 dark:bg-gray-900/95 z-40 top-0 left-0 right-0 h-20 border-b border-sky-300 dark:border-slate-800 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-end items-center">
        {user && <Hamburger lobster={lobster.className} user={user} />}
        {!user && (
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
          {session ? (
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
};

export default Navbar;

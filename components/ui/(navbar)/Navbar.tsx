import { ThemeToggle } from "@components/ThemeToggle";
import prisma from "@lib/prisma";
import { Button, buttonVariants } from "@ui/Button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavBarProps } from "../../../types/types";
import { Hamburger } from "./(responsiveNav)/Hamburger";

async function fetchUser(email: string | null | undefined) {
  try {
    if (!email) return null;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { Business: true },
    });
    return { ...user, Business: user?.Business[0] } as NavBarProps;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const Navbar = async () => {
  const session = await getServerSession();
  const user = await fetchUser(session?.user?.email);
  return (
    <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 z-40 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-end items-center">
        {user && <Hamburger user={user} />}
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
                href="/home"
              >
                Dashboard
              </Link>
              <Button variant="default">Sign Out</Button>
            </>
          ) : (
            <Button variant="default">Sign In</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

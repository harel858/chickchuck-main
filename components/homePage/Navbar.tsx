import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MaxWidthWrapper from "@components/MaxWidthWrapper";
import { buttonVariants } from "@ui/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import Image from "next/image";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const isAdmin = user?.isAdmin;

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <Image
              width={200}
              height={200}
              alt="logo"
              aria-hidden="true"
              src="/QuickLine-logo-temp3.png"
            />
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/api/auth/logout"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign out
                </Link>
                {isAdmin ? (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Dashboard ✨
                  </Link>
                ) : null}
                <Link
                  href="/login"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  היכנס לחשבון
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                {/*      <Link
                  href="/api/auth/register"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign up
                </Link>

                <Link
                  href="/api/auth/login"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Login
                </Link> */}

                <div className="h-8 w-px bg-zinc-200 sm:block" />

                <Link
                  href="/login"
                  className={`${buttonVariants({
                    size: "sm",
                    className: "sm:flex items-center gap-1",
                  })} w-max`}
                >
                  היכנס לחשבון
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;

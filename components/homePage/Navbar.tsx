import { ArrowRight } from "lucide-react";
import MaxWidthWrapper from "@components/MaxWidthWrapper";
import { buttonVariants } from "@ui/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import logo from "@public/QuickLinelogotemp3.png";

const Navbar = async ({ locale }: { locale: string }) => {
  console.log("locale", locale);

  const session = await getServerSession(authOptions);
  const user = session?.user;

  const isAdmin = user?.isAdmin;

  return (
    <nav className="sticky z-[100] h-20 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex flex-row h-20 items-center justify-between border-b border-zinc-200">
          <div className="flex z-0 pointer-events-none font-semibold">
            <Image
              width={200}
              height={200}
              alt="logo"
              aria-hidden="true"
              src={logo.src}
            />
          </div>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                {/* <Link
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
                ) : null} */}
                <Link
                  href={`/${locale}/login`}
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1",
                  })}
                >
                  {" "}
                  <ArrowLeft className="ml-1.5 h-5 w-5" />
                  היכנס לחשבון
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
                  href={`/${locale}/login`}
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

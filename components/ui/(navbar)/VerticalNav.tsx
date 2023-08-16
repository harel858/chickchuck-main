import React from "react";
import NavBarItem from "./NavBarItem";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaBusinessTime } from "react-icons/fa";
import { RiCoinsLine, RiTeamLine } from "react-icons/ri";
import { IoMdExit } from "react-icons/io";
import NavHead from "./NavHead";
import { getServerSession, User } from "next-auth";
import { CgProfile } from "react-icons/cg";
import { authOptions } from "@lib/auth";
import { notFound } from "next/navigation";
import { signOut } from "next-auth/react";
import SignOutBTN from "./SignOutBTN";

async function VerticalNav({
  user,
}: {
  user: User & {
    id: string;
    UserRole: "RECIPIENT" | "CUSTOMER";
    urls: {
      backgroundImage: string;
      profileImage: string;
    } | null;
  };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();

  return (
    <nav className="fixed top-0 h-screen w-64 max-2xl:hidden shadow-sm shadow-black/20 pt-9 gap-10 flex flex-col align-center items-center justify-start bg-slate-800 dark:bg-neutral-700 dark:text-blue-50 border-r border-gray-600 z-50">
      <NavHead user={user} />
      <ul className="flex flex-col w-full gap-1 justify-start items-center align-between text-md text-white dark:text-white">
        <NavBarItem
          title={"Bussiness Profile"}
          link={`/profile`}
          icon={<FaBusinessTime />}
        />
        <NavBarItem
          title={"Schedule"}
          link={`/schedule`}
          icon={<AiOutlineSchedule />}
        />
        <NavBarItem
          title={"Services"}
          link={`/services`}
          icon={<RiCoinsLine />}
        />
        <NavBarItem title={"Clients"} link={"/clients"} icon={<CgProfile />} />
        <NavBarItem title={"Team"} link={"/team"} icon={<RiTeamLine />} />
        <SignOutBTN />
      </ul>
    </nav>
  );
}

export default VerticalNav;

{
  /*         <NavItemWithLinks responsive={false} />
   */
}

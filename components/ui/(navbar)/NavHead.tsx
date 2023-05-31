"use client";
import React from "react";

import { Lobster_Two } from "@next/font/google";
import { Avatar } from "@mui/material";
import { User } from "next-auth";
const lobster = Lobster_Two({ weight: "400", subsets: ["latin"] });

function NavHead({
  user,
}: {
  user: User & {
    id: string;
    UserRole: "RECIPIENT" | "CUSTOMER";
  };
}) {
  return (
    <div className="relative top-0 left-0 flex justify-center content-center items-center gap-5 flex-col z-50 text-white">
      <h2
        className={` ${lobster.className}  dark:text-white text-white xl:text-4xl md:text-3xl sm:text-2xl w-max`}
      >
        Queue
      </h2>
      <Avatar alt="Remy Sharp" src={undefined} />
      <h3
        className={`dark:text-white text-white font-medium  xl:text-xl md:text-lg sm:text-md w-max `}
      >
        Hello, {user?.name}
      </h3>
    </div>
  );
}

export default NavHead;

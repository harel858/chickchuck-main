"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { RxExit } from "react-icons/rx";

function SignOutBTN() {
  return (
    <li
      className={`flex justify-start gap-4 border-white/30 border-b w-full group hover:bg-opacity-10 hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer p-4 my-0 transition-all ease-in duration-200`}
      onClick={() => signOut({ callbackUrl: "/signin" })}
    >
      <div
        className={`self-center transition-all ease-in duration-200 scale-125 group-hover:scale-150  text-xl text-white`}
      >
        <RxExit />
      </div>
      <div
        className={`text-white relative font-light
      w-max after:absolute after:bottom-0 after:mt-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-500 after:translate-y-1 after:scale-x-0 after:ease-in after:duration-200 ease-in duration-200 group-hover:after:scale-x-100 text-xl`}
      >
        Sign Out
      </div>
    </li>
  );
}

export default SignOutBTN;

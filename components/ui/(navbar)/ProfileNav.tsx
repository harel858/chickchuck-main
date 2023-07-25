"use client";
import React from "react";
import { LandingPageData } from "types/types";
import { Button } from "@ui/Button";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { FaWaze } from "react-icons/fa";

function ProfileNav({ business }: { business: LandingPageData }) {
  return (
    <nav className="fixed backdrop-blur-sm px-3 bg-sky-500 dark:bg-gray-900/95 z-40 top-0 left-0 right-0 h-20 border-b border-gray-900 dark:border-slate-800 shadow-sm flex items-center justify-between">
      <Button
        size={"lg"}
        variant={"link"}
        className="flex justify-center items-center gap-2 text-base text-white hover:text-black"
      >
        I'd Like Such For My Business
      </Button>
    </nav>
  );
}

export default ProfileNav;

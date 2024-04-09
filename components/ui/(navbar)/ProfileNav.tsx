"use client";
import React from "react";
import { LandingPageData } from "types/types";
import { Button } from "@ui/Button";
import {
  Address,
  Business,
  BusinessType,
  ComeFrom,
  LastCalendar,
} from "@prisma/client";
import { GetResult } from "@prisma/client/runtime";

function ProfileNav({
  business,
}: {
  business: {
    Images: any;
    Address: Address[];
    businessName: string;
    phone: string;
    businessImage: string | null;
    BusinessType: BusinessType;
    LastCalendar: LastCalendar;
    ComeFrom: ComeFrom;
  };
}) {
  return (
    <nav className="fixed backdrop-blur-sm px-3 bg-white/50 dark:bg-gray-900/95 z-40 top-0 left-0 right-0 h-20 border-b border-gray-900 dark:border-slate-800 shadow-sm flex items-center justify-between">
      <Button
        size={"lg"}
        variant={"default"}
        className="flex justify-center items-center gap-2 text-base text-white hover:text-black"
      >
        I'd Like To Join QueueBook
      </Button>
    </nav>
  );
}

export default ProfileNav;

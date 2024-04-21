"use client";
import { ActivityDays, User } from "@prisma/client";
import { Button } from "@ui/Button";
import React, { Suspense, useCallback } from "react";
import { BiEdit } from "react-icons/bi";

export default function DetailsButton({
  user,
}: {
  user: User & {
    activityDays?: ActivityDays[];
  };
}) {
  return (
    <>
      <Button className="group-hover:bg-slate-100 hover:scale-125 transition-all ease-in-out duration-200 group-hover:text-black rounded-full">
        <BiEdit className="text-2xl" />
      </Button>
    </>
  );
}

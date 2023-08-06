"use client";
import React, { useEffect, useState } from "react";
import { ProfilePageData } from "types/types";
import BussinessActivity from "./BussinessActivity/BussinessActivity/BussinessActivity";
import UniqueLink from "@ui/UniqueLink";
import BussinessAddress from "@ui/BussinessProfile/bussinessAddresses/bussinessAddress";

function Profile({ link, user }: { link: string; user: ProfilePageData }) {
  return (
    <div className="flex flex-col justify-center flex-wrap items-center gap-10 m-0 max-2xl:mt-20 w-full">
      <UniqueLink link={link} />
      <BussinessActivity user={user} />
      <BussinessAddress user={user} />
    </div>
  );
}

export default Profile;

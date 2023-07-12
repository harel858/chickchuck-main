"use client";
import React, { useEffect, useState } from "react";
import { ProfilePageData } from "types/types";
import BussinessActivity from "./BussinessActivity/BussinessActivity/BussinessActivity";
import UniqueLink from "@ui/UniqueLink";
import BussinessAddress from "@ui/BussinessProfile/bussinessAddresses/bussinessAddress";
import Loading from "@app/(business)/profile/loading";

function Profile({ link, user }: { link: string; user: ProfilePageData }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);

  return loading ? (
    <Loading />
  ) : (
    <div className="flex justify-center flex-wrap items-center max-2xl:m-0 w-full">
      <div className="relative flex flex-row flex-nowrap justify-center items-baseline gap-14 w-full max-2xl:gap-5 max-2xl:flex-col max-2xl:mt-36 max-2xl:items-center">
        <div className="flex justify-center items-baseline gap-14 max-2xl:flex-col-reverse max-2xl:items-center">
          <BussinessActivity user={user} />
          <UniqueLink link={link} />
        </div>
        <BussinessAddress user={user} />
      </div>
    </div>
  );
}

export default Profile;

"use client";
import React, { useCallback, useRef } from "react";
import { User } from "next-auth";
import { FaEdit } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiShare } from "react-icons/fi";
import { Session } from "next-auth";
import { Badge, Button, Tooltip } from "antd";
import Avatar from "@ui/Avatar";
import NavButtons from "@ui/NavButtons";
import { ActivityDays, Business, Images, Treatment } from "@prisma/client";

function TopHead({
  urls,
  business,
}: {
  urls: {
    profileUrls: string;
    backgroundUrls: string;
  } | null;
  business: Business & {
    Treatment: Treatment[];
    Images: Images[];
    activityDays: ActivityDays[];
    user: User[];
  };
}) {
  const profileImage = urls?.profileUrls;
  const backgroundUrl = urls?.backgroundUrls;

  return (
    <div
      className="relative flex flex-col justify-end items-center pt-40 max-md:m-0 rounded-3xl inset-y-0 top-0 left-0 right-0 w-7/12 h-1/6 bg-cover bg-center z-0 max-md:w-full max-md:rounded-t-none max-md:ml-auto shadow-2xl dark:shadow-white/10"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 0)), url(${backgroundUrl})`,
        backgroundSize: "cover",
        /*         boxShadow: "inset 0px -50vh 30px rgba(0, 0, 0, 0.4)",
         */
      }}
    >
      <div className="rounded-full flex justify-center transition-all ease-in-out duration-200">
        <Avatar
          alt="Profile Img"
          className="border-black border-2 cursor-pointer rounded-full p-0 m-0"
          height={90}
          width={90}
          src={profileImage || undefined}
        />
      </div>{" "}
      <div className="flex justify-center">
        <NavButtons business={business} />
      </div>
    </div>
  );
}

export default TopHead;

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

function Images({
  urls,
}: {
  urls: {
    profileUrls: string;
    backgroundUrls: string;
  } | null;
}) {
  const profileImage = urls?.profileUrls;
  const backgroundUrl = urls?.backgroundUrls;

  return (
    <div
      className="relative p-32 max-2xl:m-0 rounded-3xl  inset-y-0 top-0 left-0 right-0 w-1/2 h-1/5 bg-cover bg-center z-0 max-2xl:w-full max-2xl:rounded-t-none max-2xl:ml-auto shadow-2xl dark:shadow-white/10"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        boxShadow: "inset 0px -20vh 70px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Button className="bg-slate-200 shadow-md shadow-black/50 hover:bg-slate-900 text-black hover:text-white absolute z-20 top-5 left-4 text-base">
        <FiShare className="text-xl" />
      </Button>

      <div className="absolute z-40 -bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center hover:scale-125 transition-all ease-in-out duration-200">
        <Avatar
          alt="Profile Img"
          className={`border-white border-2 p-0 m-0`}
          height={90}
          width={90}
          src={profileImage || undefined}
        />
      </div>
    </div>
  );
}

export default Images;

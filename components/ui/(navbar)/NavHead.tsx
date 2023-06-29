import React from "react";
import { Avatar } from "@mui/material";
import { User } from "next-auth";
import ProfileImage from "./ProfileImage";

function NavHead({
  user,
  lobsterFont,
}: {
  user: User & {
    id: string;
    UserRole: "RECIPIENT" | "CUSTOMER";
    urls: {
      backgroundImage: string;
      profileImage: string;
    } | null;
  };
  lobsterFont: string;
}) {
  const profileImage = user.urls?.profileImage;

  return (
    <div className="relative top-0 left-0 flex justify-center content-center items-center gap-5 flex-col z-50 text-white">
      <h1
        className={` ${lobsterFont}  dark:text-white text-white text-4xl w-max`}
      >
        Queue.
      </h1>
      <ProfileImage enable={false} user={user} />
      <h3
        className={`dark:text-white text-white font-medium  xl:text-xl md:text-lg sm:text-md w-max `}
      >
        Hello, {user?.name}
      </h3>
    </div>
  );
}

export default NavHead;

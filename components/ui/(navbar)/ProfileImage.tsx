"use client";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { User } from "@prisma/client";

function ProfileImage({ user }: { user: User }) {
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(
    user?.profileSrc ?? undefined
  );

  const postData = async (imageSrc: string) => {
    console.log(imageSrc);

    try {
      const response = await axios.post("/api/user/profileImage", {
        imageSrc,
        userId: user?.id,
      });
      const responseData = response?.data;
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          const imageSrc = reader.result as string;
          setAvatarSrc(imageSrc);
          await postData(imageSrc);
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center">
      <label htmlFor="avatar-input">
        <Avatar
          alt="Profile Img"
          className="scale-125 hover:scale-150 duration-300 ease-out cursor-pointer"
          src={avatarSrc}
        />
      </label>
      <input
        id="avatar-input"
        className="opacity-0 hidden"
        accept="image/*"
        multiple
        type="file"
        onChange={handleAvatarChange}
      />
    </div>
  );
}

export default ProfileImage;

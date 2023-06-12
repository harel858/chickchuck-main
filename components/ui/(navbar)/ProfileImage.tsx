"use client";
import React, { useCallback } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";
import { User } from "next-auth";
import imageCompression from "browser-image-compression";

// Move dependencies outside the component
const imageCompressionOptions = {
  maxSizeMB: 0.0001,
  maxWidthOrHeight: 500,
};

const ProfileImage = ({
  user,
}: {
  user: User & {
    id: string;
    UserRole: "RECIPIENT" | "CUSTOMER";
    urls: {
      backgroundImage: string;
      profileImage: string;
    } | null;
  };
}) => {
  const profileImage = user.urls?.profileImage;

  const postData = async (imageSrc: File) => {
    console.log(imageSrc);
    const formData = new FormData();
    formData.append("imageSrc", imageSrc);
    formData.append("type", "PROFILE");
    formData.append("userId", user.id);

    try {
      const response = await axios.post("/api/user/profileImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const file = event.target.files?.[0];

        if (file) {
          const compressedFile = await imageCompression(
            file,
            imageCompressionOptions
          );
          await postData(compressedFile);
        }
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  return (
    <div className="flex justify-center">
      <label htmlFor="avatar-input">
        <Avatar
          alt="Profile Img"
          className="scale-125 hover:scale-150 duration-300 ease-out cursor-pointer"
          src={profileImage || undefined}
        />
      </label>
      <input
        id="avatar-input"
        className="opacity-0 hidden"
        accept="image/*"
        type="file"
        onChange={handleAvatarChange}
      />
    </div>
  );
};

export default ProfileImage;

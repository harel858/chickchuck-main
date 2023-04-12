"use client";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";

function ProfileImage() {
  const [avatarSrc, setAvatarSrc] = useState("/static/images/avatar/1.jpg");

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setAvatarSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {}
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

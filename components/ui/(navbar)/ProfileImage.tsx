"use client";
import React, { useCallback } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
  },
}));

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
  const router = useRouter();
  const profileImage = user.urls?.profileImage;

  const postData = async (imageSrc: File) => {
    console.log(imageSrc);
    const formData = new FormData();
    formData.append("imageSrc", imageSrc);
    formData.append("type", "PROFILE");
    formData.append("userId", user.id);

    try {
      const response = await axios.post("/api/user/image-route", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) return router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const file = event.target.files?.[0];

        if (file) {
          await postData(file);
        }
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  return (
    <BootstrapTooltip title="Change Business Logo">
      <div className="flex justify-center ">
        <label htmlFor="avatar-input">
          <Avatar
            alt="Profile Img"
            sx={{ width: 100, height: 100 }}
            className="border-white border-2 scale-125 hover:scale-150 duration-300 ease-out cursor-pointer"
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
    </BootstrapTooltip>
  );
};

export default ProfileImage;

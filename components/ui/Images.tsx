"use client";
import React, { useCallback, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import Avatar from "./Avatar";
import { Badge, Tooltip } from "antd";
import { Session } from "next-auth";
import {
  ActivityDays,
  Business,
  Images,
  Treatment,
  User,
} from "@prisma/client";
import NavButtons from "./NavButtons";

function AdminImages({
  session,
  urls,
  business,
}: {
  session: Session;
  business: Business & {
    Treatment: Treatment[];
    Images: Images[];
    activityDays: ActivityDays[];
    user: User[];
  };
  urls: {
    profileUrls: string;
    backgroundUrls: string;
  } | null;
}) {
  const { user } = session;
  const router = useRouter();
  const profileImage = urls?.profileUrls;
  const backgroundUrl = urls?.backgroundUrls;

  const profileInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  const postData = async (imageSrc: File, type: "BACKGROUND" | "PROFILE") => {
    const formData = new FormData();
    formData.append("imageSrc", imageSrc);
    formData.append("type", type);
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

  const handleChange = useCallback(
    async (
      event: React.ChangeEvent<HTMLInputElement>,
      type: "BACKGROUND" | "PROFILE"
    ) => {
      try {
        const file = event.target.files?.[0];
        if (file) {
          await postData(file, type);
        }
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  const handleButtonClick = () => {
    if (profileInputRef.current) {
      profileInputRef.current.click();
    }
  };

  const handleBackgroundButtonClick = () => {
    if (backgroundInputRef.current) {
      backgroundInputRef.current.click();
    }
  };

  return (
    <div
      className="border border-gray-500 relative flex flex-col justify-end items-center pt-40 max-md:m-0 rounded-3xl inset-y-0 top-0 left-0 right-0 w-7/12 h-1/5 bg-cover bg-center z-0 max-md:w-full max-md:rounded-t-none max-md:ml-auto shadow-2xl dark:shadow-white/10"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(226 ,232 ,240, 1) 10% ,rgba(226 ,232 ,240, 0)), url(${backgroundUrl})`,
        backgroundSize: "cover",
        /*         boxShadow: "inset 0px -50vh 30px rgba(226 ,232 ,240, 0)",
         */
      }}
    >
      <Button
        variant={"ghost"}
        onClick={handleBackgroundButtonClick}
        className="absolute top-5 left-5 bg-white/70 p-2 flex justify-center items-center gap-2 rounded-lg z-40"
      >
        <span className="max-md:hidden">ערוך תמונת נושא</span>
        <FaCamera className="text-black text-xl " />
      </Button>
      <input
        ref={profileInputRef}
        className="opacity-0 hidden"
        accept="image/*"
        type="file"
        onChange={(e) => handleChange(e, "PROFILE")}
      />
      <input
        ref={backgroundInputRef}
        className="opacity-0 hidden"
        accept="image/*"
        type="file"
        onChange={(e) => handleChange(e, "BACKGROUND")}
      />
      <div className="flex flex-col items-center justify-end mt-auto mb-4">
        <Tooltip title="שינוי תמונה" arrow={false} placement={"bottom"}>
          <div className="absolute rounded-full z-40 -bottom-1/4 right-4 transform -translate-y-1/2 flex justify-center hover:scale-125 transition-all ease-in-out duration-200">
            <Badge
              offset={[-10, 10]}
              count={
                <div className="bg-white/50 rounded-lg p-2 flex justify-center items-center">
                  <FaCamera className="text-black text-xl " />
                </div>
              }
            >
              <Avatar
                alt="Profile Img"
                onClick={handleButtonClick}
                className="border-black border-2 cursor-pointer rounded-full p-0 m-0"
                height={90}
                width={90}
                src={profileImage || undefined}
              />
            </Badge>
          </div>
        </Tooltip>
        <div className="mt-4 flex justify-center">
          <NavButtons business={business} />
        </div>
      </div>
    </div>
  );
}

export default AdminImages;

"use client";
import React, { useCallback, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import Avatar from "./Avatar";
import { Badge, Tooltip } from "antd";
import { Session } from "next-auth";
import NavButtons from "./NavButtons";

function Images({
  session,
  urls,
}: {
  session: Session;
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
      className="relative p-32 max-md:m-0 rounded-3xl inset-y-0 top-0 left-0 right-0 w-1/2 h-1/5 bg-cover bg-center z-0 max-md:w-full max-md:rounded-t-none max-md:ml-auto shadow-2xl dark:shadow-white/10"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        boxShadow: "inset 0px -10vh 30px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Button
        variant={"ghost"}
        onClick={handleBackgroundButtonClick}
        className="bg-white/70  p-2 flex justify-center items-center gap-2 absolute rounded-lg z-40 left-2 bottom-2 transform"
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
              className={`border-black border-2 cursor-pointer rounded-full p-0 m-0`}
              height={90}
              width={90}
              src={profileImage || undefined}
            />
          </Badge>
        </div>
      </Tooltip>
    </div>
  );
}

export default Images;

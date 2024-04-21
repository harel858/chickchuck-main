"use client";
import React, { useCallback, useRef } from "react";
import { User } from "next-auth";
import { FaEdit } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import LargeHeading from "./LargeHeading";
import { FiShare } from "react-icons/fi";
import { Session } from "next-auth";
import Avatar from "./Avatar";
import { Badge, Tooltip } from "antd";

function Images({
  session,
  urls,
}: {
  session: Session;
  urls: {
    profileUrls: string;
    backgroundUrls: string[];
  } | null;
}) {
  console.log("session", session);
  const { user } = session;
  const router = useRouter();

  const profileImage = urls?.profileUrls;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const postData = async (imageSrc: File) => {
    const formData = new FormData();
    formData.append("imageSrc", imageSrc);
    formData.append("type", "PROFILE");
    formData.append("userId", user.id);

    try {
      const response = await axios.post("/api/user/image-route", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log({ response });

      if (response.status == 201) return router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = useCallback(
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

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className="relative p-32 max-md:m-0 rounded-3xl  inset-y-0 top-0 left-0 right-0 w-1/2 h-1/5 bg-cover bg-center z-0 max-md:w-full max-md:rounded-t-none max-md:ml-auto shadow-2xl dark:shadow-white/10"
      style={{
        backgroundImage: `url(${profileImage})`,
        backgroundSize: "cover",
        boxShadow: "inset 0px -10vh 30px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Button
        className="bg-slate-200 shadow-md shadow-black/50 hover:bg-slate-900 text-black hover:text-white absolute z-20 top-5 left-4 text-base"
        onClick={handleButtonClick}
      >
        <FiShare className="text-xl" />
      </Button>
      <input
        ref={fileInputRef}
        className="opacity-0 hidden"
        accept="image/*"
        type="file"
        onChange={handleChange}
      />
      <Tooltip title="שינוי תמונה" arrow={false} placement={"bottom"}>
        <div className="absolute rounded-full z-40 -bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center hover:scale-125 transition-all ease-in-out duration-200">
          <Badge
            offset={[-10, 10]}
            count={
              <div className="bg-white/50 rounded-full p-2 flex justify-center items-center">
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

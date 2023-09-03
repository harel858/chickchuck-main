"use client";
import React, { useCallback, useRef } from "react";
import { User } from "next-auth";
import { BsImage } from "react-icons/bs";
import ProfileImage from "./(navbar)/ProfileImage";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import LargeHeading from "./LargeHeading";

function Images({
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
}) {
  const router = useRouter();
  const backgroundImageUrl =
    user.urls?.backgroundImage ||
    "https://cdn.pixabay.com/photo/2015/01/09/11/08/startup-594090_1280.jpg"; // Replace with the URL of your dynamic background image

  const fileInputRef = useRef<HTMLInputElement>(null);

  const postData = async (imageSrc: File) => {
    const formData = new FormData();
    formData.append("imageSrc", imageSrc);
    formData.append("type", "BACKGROUND");
    formData.append("userId", user.id);

    try {
      const response = await axios.post("/api/user/image-route", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);

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
      className="relative p-32 max-2xl:m-0 max-2xl:top-20 mt-20 inset-y-0 top-0 left-0 right-0 w-full h-1/5 bg-cover bg-center z-0 max-2xl:w-full max-2xl:rounded-t-none max-2xl:ml-auto shadow-2xl dark:shadow-white/10"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        boxShadow: "inset 0px 22vh 30px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div className="flex flex-col justify-center items-center absolute top-5 max-xl:top-1 max-xl:right-1 left-0 right-0 w-full">
        <LargeHeading size={"default"} className="text-white">
          Bussiness Profile
        </LargeHeading>
      </div>
      <Button
        className="bg-slate-200 shadow-md shadow-black/50 hover:bg-slate-900 text-black hover:text-white absolute z-20 top-24 right-4  text-base"
        onClick={handleButtonClick}
      >
        Edit Business Image <BsImage className="mx-2" />
      </Button>
      <input
        ref={fileInputRef}
        className="opacity-0 hidden"
        accept="image/*"
        type="file"
        onChange={handleChange}
      />
      <div className="absolute z-40 -bottom-6 left-1/2 right-1/2 flex justify-center">
        <ProfileImage enable={true} user={user} />
      </div>
    </div>
  );
}

export default Images;

"use client";
import { User } from "next-auth";
import React, { useCallback, useRef } from "react";
import { BsImage } from "react-icons/bs";
import ProfileImage from "./(navbar)/ProfileImage";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import axios from "axios";

function Images({
  user,
  lobster,
}: {
  user: User & {
    id: string;
    UserRole: "RECIPIENT" | "CUSTOMER";
    urls: {
      backgroundImage: string;
      profileImage: string;
    } | null;
  };
  lobster: string;
}) {
  const router = useRouter();
  const backgroundImageUrl =
    user.urls?.backgroundImage ||
    "https://cdn.pixabay.com/photo/2018/02/03/09/51/bulletin-board-3127287_1280.jpg"; // Replace with the URL of your dynamic background image

  const fileInputRef = useRef<HTMLInputElement>(null);

  const postData = async (imageSrc: File) => {
    console.log(imageSrc);
    const formData = new FormData();
    formData.append("imageSrc", imageSrc);
    formData.append("type", "BACKGROUND");
    formData.append("userId", user.id);

    try {
      const response = await axios.post("/api/user/image-route", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
      className="relative  max-2xl:p-32 max-2xl:m-0 max-2xl:top-20  mt-20 inset-y-0 top-0 left-0 right-0 w-10/12 h-1/3 bg-cover bg-center z-0 ml-52 max-2xl:w-full max-2xl:rounded-t-none max-2xl:ml-auto shadow-2xl rounded-2xl dark:shadow-white/10"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        boxShadow: "inset -20px 10em 50px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className=" flex justify-center items-center absolute top-5 left-0 right-0 w-full">
        <h1
          className={`text-white text-5xl shadow-2xl shadow-black ${lobster} `}
        >
          Queue.
        </h1>
      </div>
      <Button
        className="shadow-lg shadow-black hover:bg-slate-200 hover:text-black bg-slate-900/90 text-white absolute z-20 top-1/3 right-4  text-base"
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
      <div className="absolute -bottom-3 left-1/2 right-1/2 transform -translate-x-1/2">
        <ProfileImage enable={true} user={user} />
      </div>
    </div>
  );
}

export default Images;

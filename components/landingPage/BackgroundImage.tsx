"use client";
import React from "react";
import { LandingPageData } from "types/types";
import LargeHeading from "@ui/LargeHeading";

function BackgroundImage({
  business,
  lobster,
}: {
  business: LandingPageData;
  lobster: string;
}) {
  const backgroundImageUrl =
    business.Images?.backgroundImage ||
    "https://cdn.pixabay.com/photo/2015/01/09/11/08/startup-594090_1280.jpg"; // Replace with the URL of your dynamic background image

  return (
    <div
      className="relative p-32 max-2xl:p-20 max-2xl:m-0 inset-y-0 top-0 left-0 right-0 w-10/12 h-1/5 bg-cover bg-center z-0 max-2xl:w-full max-md:rounded-b-none max-2xl:ml-auto shadow-2xl rounded-b-2xl dark:shadow-white/10"
      style={{
        backgroundImage: `url(${backgroundImageUrl || business.businessImage})`,
        boxShadow: "inset 0px 22vh 30px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div className="flex flex-col justify-center items-center gap-2 absolute top-0 left-0 right-0 w-full">
        <h1
          className={`text-white text-4xl shadow-2xl shadow-black ${lobster}`}
        >
          Queue.
        </h1>
        <LargeHeading size={"default"} className="text-white">
          {business.businessName}
        </LargeHeading>
      </div>
    </div>
  );
}

export default BackgroundImage;

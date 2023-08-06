"use client";
import React from "react";
import { LandingPageData } from "types/types";
import LargeHeading from "@ui/LargeHeading";
import { Avatar } from "@mui/material";
import { Button } from "@ui/Button";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { FaWaze } from "react-icons/fa";

function BackgroundImage({
  business,
  lobster,
}: {
  business: LandingPageData;
  lobster: string;
}) {
  const profileImage = business.Images?.profileImage;
  console.log(
    `https://waze.com/ul?q=${business?.Address[0]?.street} ${business?.Address[0]?.city}`
  );

  const backgroundImageUrl =
    business.Images?.backgroundImage ||
    "https://cdn.pixabay.com/photo/2015/01/09/11/08/startup-594090_1280.jpg"; // Replace with the URL of your dynamic background image

  return (
    <div
      className="relative p-32 max-2xl:p-20 max-2xl:m-0 inset-y-0 top-0 left-0 right-0 w-full h-1/5 bg-cover bg-center z-0 max-2xl:w-full max-md:rounded-b-none max-2xl:ml-auto shadow-2xl rounded-b-2xl dark:shadow-white/10"
      style={{
        backgroundImage: `url(${backgroundImageUrl || business.businessImage})`,
        boxShadow: "inset 0px 22vh 30px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div className="flex flex-row gap-3 justify-start items-center absolute bottom-3 left-3">
        <a href={`tel:${business.phone}`}>
          <Button
            variant={"default"}
            className="flex justify-center items-center gap-2 bg-slate-100 z-40 text-black hover:text-white"
          >
            <span className="max-xl:hidden ">{business.phone}</span>
            <span className="text-xl">
              <BsFillTelephoneForwardFill />
            </span>
          </Button>
        </a>
        <a
          href={`https://waze.com/ul?q=${business?.Address[0]?.street} ${business?.Address[0]?.city}`}
        >
          <Button
            variant={"default"}
            className="flex justify-center items-center gap-2 bg-slate-100 z-40 text-black hover:text-white"
          >
            <span className="max-xl:hidden">
              {business.Address[0]
                ? `${business.Address[0].street}, ${business.Address[0].city}`
                : null}
            </span>
            <span className="text-2xl">
              <FaWaze />
            </span>
          </Button>
        </a>
      </div>
      <div className="flex flex-col justify-center items-center absolute top-5 max-xl:top-1 max-xl:right-1 left-0 right-0 w-full">
        <h1 className={`text-white text-3xl  ${lobster}`}>QueueBook.</h1>
        <LargeHeading size={"default"} className="text-white">
          {business.businessName}
        </LargeHeading>
      </div>
      <div className="absolute z-40 -bottom-6 left-1/2 right-1/2 flex justify-center">
        <Avatar
          alt="Profile Img"
          sx={{ width: 90, height: 90 }}
          className={`border-white border-2`}
          src={profileImage || undefined}
        />
      </div>
    </div>
  );
}

export default BackgroundImage;

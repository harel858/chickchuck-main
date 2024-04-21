import React from "react";
import { Business, BusinessType, ComeFrom, LastCalendar } from "@prisma/client";
import { Button } from "./Button";
import LargeHeading from "./LargeHeading";
import { FaWhatsapp } from "react-icons/fa";
import { FaWaze } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";

function NavButtons({ business }: { business: Business }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <LargeHeading size={"default"} className="text-black font-normal">
        {business.businessName}
      </LargeHeading>
      {business.Address ? (
        <a href={`https://waze.com/ul?q=${business?.Address}`}>
          <Button
            variant={"link"}
            size={"sm"}
            className="text-black font-normal flex justify-center items-center gap-2"
          >
            <LargeHeading
              size={"sm"}
              className="text-black font-normal flex justify-center items-center gap-2"
            >
              {business.Address}
            </LargeHeading>
            <IoIosPin />
          </Button>
        </a>
      ) : (
        <></>
      )}
      <div className="flex justify-center items-center gap-4">
        <Button className="rounded-full bg-white text-black hover:text-white border border-slate-400 ">
          <FaWhatsapp className="text-3xl font-bold" />
        </Button>
        <Button className="rounded-full bg-white text-black hover:text-white border border-slate-400 ">
          <FaPhoneAlt className="text-3xl font-bold" />
        </Button>
        <a href={`https://waze.com/ul?q=${business?.Address}`}>
          {" "}
          <Button className="rounded-full bg-white text-black hover:text-white border border-slate-400 ">
            <FaWaze className="text-3xl font-bold" />
          </Button>
        </a>
      </div>
    </div>
  );
}

export default NavButtons;

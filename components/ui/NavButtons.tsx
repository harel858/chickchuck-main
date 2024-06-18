import React from "react";
import { Business } from "@prisma/client";
import { Button } from "./Button";
import LargeHeading from "./LargeHeading";
import { FaWhatsapp } from "react-icons/fa";
import { FaWaze } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";

function NavButtons({ business }: { business: Business }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="flex justify-center items-center gap-4">
        <a href={`https://api.whatsapp.com/send?phone=972${business.phone}`}>
          <Button className="rounded-full bg-white text-black hover:text-white border border-slate-400 ">
            <FaWhatsapp className="text-3xl font-bold" />
          </Button>
        </a>
        <a href={`tel:${business.phone}`}>
          <Button className="rounded-full bg-white text-black hover:text-white border border-slate-400 ">
            <FaPhoneAlt className="text-3xl font-bold" />
          </Button>
        </a>
        <a href={`https://waze.com/ul?q=${business?.Address}`}>
          <Button className="rounded-full bg-white text-black hover:text-white border border-slate-400 ">
            <FaWaze className="text-3xl font-bold" />
          </Button>
        </a>
      </div>
      <LargeHeading className="text-black text-3xl font-medium m-0">
        {business.businessName}
      </LargeHeading>
      {business.Address ? (
        <a href={`https://waze.com/ul?q=${business?.Address}`}>
          <Button
            variant={"link"}
            size={"sm"}
            className="text-black font-normal flex justify-center items-baseline align-baseline gap-2"
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
    </div>
  );
}

export default NavButtons;

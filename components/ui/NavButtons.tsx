import React from "react";
import { Business } from "@prisma/client";
import { Button } from "./Button";
import { FaWhatsapp, FaWaze, FaPhoneVolume } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";

function NavButtons({ business }: { business: Business }) {
  return (
    <div className="flex flex-col justify-center items-center gap-0 p-4">
      <h1 className="text-black text-2xl font-bold m-0">
        {business.businessName}
      </h1>
      {business.Address ? (
        <a
          href={`https://waze.com/ul?q=${business?.Address}`}
          className="w-full"
        >
          <Button
            variant={"link"}
            size={"sm"}
            className="text-black font-normal flex justify-center items-center gap-2 w-full"
          >
            <p className="text-black text-xl font-normal flex justify-center items-center gap-2">
              {business.Address}
            </p>
            <IoIosPin className="text-2xl" />
          </Button>
        </a>
      ) : null}
      <div className="flex justify-center items-center gap-8 mt-4">
        <a href={`https://api.whatsapp.com/send?phone=972${business.phone}`}>
          <Button className="rounded-full bg-slate-950 text-white hover:bg-slate-800 border-none p-3">
            <FaWhatsapp className="text-2xl" />
          </Button>
        </a>
        <a href={`tel:${business.phone}`}>
          <Button className="rounded-full bg-slate-950 text-white hover:bg-slate-800 border-none p-3">
            <FaPhoneVolume className="text-2xl" />
          </Button>
        </a>
        <a href={`https://waze.com/ul?q=${business?.Address}`}>
          <Button className="rounded-full bg-slate-950 text-white hover:bg-slate-800 border-none p-3">
            <FaWaze className="text-2xl" />
          </Button>
        </a>
      </div>
    </div>
  );
}

export default NavButtons;

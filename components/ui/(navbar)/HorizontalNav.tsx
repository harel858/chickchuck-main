import React from "react";
import { User } from "@prisma/client";
import { BsBell } from "react-icons/bs";
function HorizontalNav({ user }: { user: User }) {
  return (
    <div
      className={`flex fixed content-around pr-8 py-8 justify-end  w-full top-0 bg-gray-800 z-10 `}
    >
      <div
        className="text-white self-center transition-all ease-in duration-100 hover:scale-110 cursor-pointer 
        text-xl"
      >
        <BsBell />
      </div>
    </div>
  );
}

export default HorizontalNav;

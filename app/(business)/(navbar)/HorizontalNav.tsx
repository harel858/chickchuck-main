import React from "react";
import { User } from "@prisma/client";
import { BsBell } from "react-icons/bs";
import classes from "./style.module.css";

function HorizontalNav({ user }: { user: User }) {
  return (
    <div className="flex relative content-around pr-8 py-6 justify-end  w-full top-0 bg-gray-800 z-10">
      <h2
        className={`${classes.h2} text-white absolute top-0 left-0 xl:text-3xl md:text-2xl sm:text-2xl w-max p-4`}
      >
        Hello {user.name}
      </h2>
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

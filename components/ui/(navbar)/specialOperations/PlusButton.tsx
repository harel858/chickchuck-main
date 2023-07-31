import { Button, buttonVariants } from "@ui/Button";
import React from "react";
import { BsPlusSquare } from "react-icons/bs";

function PlusButton() {
  return (
    <Button
      variant={"ghost"}
      className={` transition-all ease-in-out duration-300 hover:scale-125 w-fit h-fit cursor-pointer m-0 p-0 flex flex-row-reverse justify-center gap-2 items-center text-base hover:bg-slate-100`}
    >
      <BsPlusSquare className="text-3xl m-0 p-0" />
    </Button>
  );
}

export default PlusButton;

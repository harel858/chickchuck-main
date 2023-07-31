import { Button, buttonVariants } from "@ui/Button";
import React from "react";
import { GrNotification } from "react-icons/gr";

function PlusButton() {
  return (
    <Button
      variant={"ghost"}
      className={` transition-all ease-in-out duration-300 hover:scale-125 cursor-pointer m-0 p-0 flex flex-row-reverse justify-center gap-2 items-center text-base hover:bg-slate-100`}
    >
      <GrNotification className="text-3xl m-0 p-0" />
    </Button>
  );
}

export default PlusButton;

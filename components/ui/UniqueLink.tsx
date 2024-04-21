"use client";
import React from "react";
import Link from "next/link";
import QrCode from "@ui/QrCode";
import { AiFillCopy } from "react-icons/ai";
import { Tooltip } from "antd";
function UniqueLink({ link }: { link: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="flex flex-col items-center justify-center self-center gap-6">
      <div className="flex items-center justify-center gap-2 bg-slate-100 text-black shadow-sm shadow-black dark:bg-slate-300 max-2xl:w-fit rounded-xl p-2 border-2 border-gray-500">
        <Tooltip title="Copy Link">
          <button onClick={copyToClipboard}>
            <AiFillCopy className="text-xl hover:scale-125 ease-out duration-300 cursor-pointer" />
          </button>
        </Tooltip>
        <Link
          className="font-medium hover:underline max-2xl:w-max hover:decoration-1	text-black text-lg"
          href={link}
          target="_blank"
        >
          {link}
        </Link>
      </div>
      <QrCode link={link} />
    </div>
  );
}
export default UniqueLink;

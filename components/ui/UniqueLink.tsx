"use client";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import QrCode from "@ui/QrCode";
function UniqueLink({ link }: { link: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 max-2xl:w-11/12">
      <div className="bg-white dark:bg-slate-300 max-2xl:w-full rounded-xl p-2 border-2 border-black">
        <Tooltip title="Copy link" arrow>
          <IconButton aria-label="copy link" onClick={copyToClipboard}>
            <FileCopyIcon />
          </IconButton>
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

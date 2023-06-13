"use client";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
function UniqueLink({ link }: { link: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="bg-white dark:bg-slate-300 w-max rounded-xl p-2 border-2 border-black">
      <Tooltip title="Copy link" arrow>
        <IconButton aria-label="copy link" onClick={copyToClipboard}>
          <FileCopyIcon />
        </IconButton>
      </Tooltip>
      <Link
        className="font-medium hover:underline hover:decoration-1	text-black text-lg"
        href={link}
        target="_blank"
      >
        {link}
      </Link>
    </div>
  );
}
export default UniqueLink;

"use client";
import { CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center content-center">
      <CircularProgress size={100} color="warning" />
    </div>
  );
}

export default Loading;

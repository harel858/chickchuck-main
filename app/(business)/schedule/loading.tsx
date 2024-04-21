"use client";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

function Loading() {
  return (
    <div className="h-screen flex justify-center items-center content-center">
      <CircularProgress size={100} color="warning" />
    </div>
  );
}

export default Loading;

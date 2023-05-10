"use client";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

function Loading() {
  return (
    <div className="flex justify-center">
      <CircularProgress size={100} color="warning" />
    </div>
  );
}

export default Loading;

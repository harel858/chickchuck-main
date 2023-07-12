"use client";
import { Skeleton } from "antd";
import React from "react";

function Loading() {
  return (
    <div className="flex justify-center">
      <Skeleton active />
    </div>
  );
}

export default Loading;

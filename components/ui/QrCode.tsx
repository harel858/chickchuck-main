"use client";
import { QRCode, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { Button } from "./Button";

const downloadQRCode = () => {
  const canvas = document
    .getElementById("myqrcode")
    ?.querySelector<HTMLCanvasElement>("canvas");
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.download = "QRCode.png";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

const QrCode = ({ link }: { link: string }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);
  return loading ? (
    <Skeleton.Image active />
  ) : (
    <div
      id="myqrcode"
      className="flex flex-col justify-center items-center gap-2 "
    >
      <QRCode
        className="border border-black rounded-xl shadow-sm shadow-black bg-white/90"
        color="black"
        value={link}
      />
      <Button
        variant={"ghost"}
        onClick={downloadQRCode}
        className="text-base hover:bg-slate-100 text-black"
      >
        Download QR Code <AiOutlineDownload className="m-2 text-3xl" />
      </Button>
    </div>
  );
};

export default QrCode;

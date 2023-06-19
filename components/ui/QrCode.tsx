"use client";
import { QRCode } from "antd";
import React from "react";
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

const QrCode = ({ link }: { link: string }) => (
  <div
    id="myqrcode"
    className="flex flex-col justify-center items-center gap-2"
  >
    <QRCode value={link} />
    <Button variant={"ghost"} onClick={downloadQRCode} className="text-base">
      Download <AiOutlineDownload className="m-2 text-3xl" />
    </Button>
  </div>
);

export default QrCode;

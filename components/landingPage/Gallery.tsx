"use client";
/* import "./gallery.css";
 */ import React from "react";
import { Carousel, Image } from "antd";
import { Session } from "next-auth";

const Gallery = ({
  urls,
}: {
  urls: {
    profileUrls: string;
    backgroundUrls: string;
  } | null;
}) => {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <Image.PreviewGroup
      items={[
        "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
        "https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp",
        "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
      ]}
    >
      <Image
        width={200}
        src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
      />
    </Image.PreviewGroup>
  );
};

export default Gallery;

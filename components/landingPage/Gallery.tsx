"use client";
import "./gallery.css";
import React from "react";
import { Image } from "antd";
import { Session } from "next-auth";

const Gallery = ({ session }: { session: Session }) => {
  return (
    <Image.PreviewGroup
      preview={{
        onChange: (current, prev) =>
          console.log(`current index: ${current}, prev index: ${prev}`),
      }}
    >
      <Image width={500} src={session.user?.urls?.backgroundImage} />
      <Image width={500} src={session.user?.urls?.profileImage} />
      <Image
        width={500}
        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />
      <Image
        width={500}
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
      />
    </Image.PreviewGroup>
  );
};

export default Gallery;

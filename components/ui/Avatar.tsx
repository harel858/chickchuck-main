"use client";
import React from "react";
import Image, { ImageLoaderProps } from "next/image";
const DEFAULT_AVATAR_SRC = "https://example.com/placeholder.png";

interface AvatarProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, className, style }) => {
  console.log({ src });

  const imgIxLoader = ({ src }: ImageLoaderProps) => {
    const url = new URL(src);
    console.log("url.pathname", url.pathname);

    const imgIxName = url.pathname.split("/").pop();

    const imgIxUrl = new URL("https://imgixs3.imgix.net");
    imgIxUrl.pathname = `/${imgIxName}`;
    console.log({ imgIxUrl });
    imgIxUrl.searchParams.set("auto", "format");
    imgIxUrl.searchParams.set("auto", "compress");
    return imgIxUrl.href;
  };
  return (
    <Image
      width={50}
      height={50}
      loader={imgIxLoader}
      src={src || DEFAULT_AVATAR_SRC}
      alt={alt}
      className={`rounded-full ${className}`}
      style={style}
    />
  );
};
export default Avatar;

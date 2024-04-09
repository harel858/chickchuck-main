"use client";
import React from "react";
import Image, { ImageLoaderProps } from "next/image";
const DEFAULT_AVATAR_SRC = "https://example.com/placeholder.png";

interface AvatarProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  onClick?: React.MouseEventHandler<HTMLImageElement> | undefined;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  className,
  style,
  height,
  width,
  onClick,
}) => {
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
    imgIxUrl.searchParams.set("q", "75");
    return imgIxUrl.href;
  };
  return (
    <Image
      width={width || 50}
      height={height || 50}
      loader={imgIxLoader}
      onClick={onClick}
      src={src || DEFAULT_AVATAR_SRC}
      alt={alt}
      priority
      className={`rounded-full ${className}`}
      style={{ ...style, objectFit: "contain" }}
    />
  );
};
export default Avatar;

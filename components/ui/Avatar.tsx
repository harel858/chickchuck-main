"use client";
import React from "react";
import Image, { ImageLoaderProps, StaticImageData } from "next/image";
import logo from "@public/assets/logo3.png";

const DEFAULT_AVATAR_SRC: StaticImageData = logo;

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
  const imgIxLoader = ({ src }: ImageLoaderProps) => {
    const url = new URL(src);

    const imgIxName = url.pathname.split("/").pop();

    const imgIxUrl = new URL("https://imgixs3.imgix.net");
    imgIxUrl.pathname = `/${imgIxName}`;
    imgIxUrl.searchParams.set("auto", "format");
    imgIxUrl.searchParams.set("auto", "compress");
    imgIxUrl.searchParams.set("q", "75");
    return imgIxUrl.href;
  };
  return (
    <div className="rounded-full overflow-hidden">
      <Image
        width={width || 60}
        height={height || 60}
        sizes="large"
        loader={src ? imgIxLoader : undefined}
        onClick={onClick}
        src={src || DEFAULT_AVATAR_SRC.src}
        alt={alt}
        priority
        className={`rounded-full aspect-square object-cover ${className}`}
        style={{ ...style }}
      />
    </div>
  );
};
export default Avatar;

"use client";
import React from "react";

const DEFAULT_AVATAR_SRC = "https://example.com/placeholder.png";

interface AvatarProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}
const Avatar: React.FC<AvatarProps> = ({ src, alt, className, style }) => {
  return (
    <img
      src={src || DEFAULT_AVATAR_SRC}
      alt={alt}
      className={`rounded-full ${className}`}
      style={style}
    />
  );
};
export default Avatar;

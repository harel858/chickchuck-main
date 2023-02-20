"use client";
import "../../styles/globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}

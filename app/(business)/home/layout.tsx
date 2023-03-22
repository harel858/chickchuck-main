"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import NavBar from "../(navbar)/Navbar";

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <NavBar />
      {children}
    </SessionProvider>
  );
}

"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import NavBar from "../Navbar";

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <NavBar />
      <div className="block pl-64">{children}</div>
    </SessionProvider>
  );
}

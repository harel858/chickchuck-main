"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import NavBar from "../(navbar)/Navbar";

export default function ActivityTimeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionProvider>
        <NavBar />
      </SessionProvider>
      <div className="block pl-64">{children}</div>
    </>
  );
}

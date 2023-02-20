"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import NavBar from "../Navbar";

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <SessionProvider>
        <NavBar />
      </SessionProvider>
      <div className="block pl-64">{children}</div>
    </section>
  );
}

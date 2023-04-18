"use client";
import React from "react";

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex justify-center items-center h-screen overflow-hidden pl-40 max-sm:p-0">
      {children}
    </section>
  );
}

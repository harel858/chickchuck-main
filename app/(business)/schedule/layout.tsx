"use client";
import React from "react";

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="block pl-64">{children}</div>
    </section>
  );
}

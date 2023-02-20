"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import Form from "./form";

export default function PriceListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <SessionProvider>
        <Form />
      </SessionProvider>
      <div>{children}</div>
    </section>
  );
}

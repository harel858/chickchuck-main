"use client";
import "../../../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import React from "react";
import NavBar from "../(navbar)/Navbar";
import TreatmentsForm from "./treatmentsForm";

export default function PriceListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <SessionProvider>
        <NavBar />
        <div className="block pl-64">
          {children}
          <TreatmentsForm />
        </div>
      </SessionProvider>
    </section>
  );
}

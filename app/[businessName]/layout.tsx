import { authOptions } from "@lib/auth";
import { Stepper } from "@mui/material";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

async function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col justify-center items-center">
      {children}
    </section>
  );
}

export default Layout;

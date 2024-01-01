import React from "react";
import VerticalNav from "@ui/(navbar)/VerticalNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { notFound, redirect } from "next/navigation";
import Navbar from "@ui/(navbar)/Navbar";
import { UserData } from "types/types";
import { prisma } from "@lib/prisma";
import PlusButton from "@ui/(navbar)/specialOperations/plusButton/PlusButton";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();
  const value = session?.user.business?.businessName.replace(
    /(\s)(?!\s*$)/g,
    "-"
  );
  if (!value) throw new Error("value is missing");

  return (
    <>
      {/* @ts-ignore  */}
      <Navbar session={session} link={value} />
      <PlusButton session={session} />

      <section className="flex justify-center items-center overflow-hidden">
        <div className="w-full mt-20 overflow-hidden">{children}</div>
      </section>
    </>
  );
}

export default Layout;

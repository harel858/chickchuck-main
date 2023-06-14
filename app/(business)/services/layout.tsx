import React from "react";
import VerticalNav from "@ui/(navbar)/VerticalNav";
import prisma from "@lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Lobster_Two } from "next/font/google";
import { authOptions } from "@lib/auth";
const lobster = Lobster_Two({ weight: "400", subsets: ["latin"] });

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session?.user.UserRole != "RECIPIENT") return notFound();
  return (
    <>
      <VerticalNav user={session.user} />
      <section className="h-screen w-full flex justify-center items-center">
        {children}
      </section>
    </>
  );
}

export default Layout;

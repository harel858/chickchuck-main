import React from "react";
import VerticalNav from "@ui/(navbar)/VerticalNav";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@lib/auth";
import { Lobster_Two } from "next/font/google";
const lobster = Lobster_Two({ weight: ["400"], subsets: ["latin"] });

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user.UserRole != "RECIPIENT") return notFound();
  return (
    <>
      <VerticalNav lobsterFont={lobster.className} user={session.user} />
      <section className="h-screen w-full flex justify-center items-center">
        {children}
      </section>
    </>
  );
}

export default Layout;

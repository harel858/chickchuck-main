import React from "react";
import VerticalNav from "@ui/(navbar)/VerticalNav";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@lib/auth";
import { Lobster_Two } from "next/font/google";
const lobster = Lobster_Two({ weight: ["400"], subsets: ["latin"] });

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session?.user.UserRole != "RECIPIENT") return notFound();
  return (
    <>
      <VerticalNav lobsterFont={lobster.className} user={session?.user} />
      <section className="flex justify-center items-center h-screen overflow-hidden pl-40 max-md:p-0">
        <div className="w-5/6 h-5/6 mt-16 ">{children}</div>
      </section>
    </>
  );
}

export default Layout;

import React from "react";
import VerticalNav from "@ui/(navbar)/VerticalNav";
import prisma from "@lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Lobster_Two } from "@next/font/google";
const lobster = Lobster_Two({ weight: "400", subsets: ["latin"] });

async function fetchUser(email: string | null | undefined) {
  try {
    if (!email) return null;
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  const user = await fetchUser(session?.user?.email);
  if (!user) return notFound();
  return (
    <>
      <VerticalNav user={user} lobster={lobster.className} />
      <section className="h-screen w-full flex justify-center items-center">
        {children}
      </section>
    </>
  );
}

export default Layout;

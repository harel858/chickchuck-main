import React from "react";
import VerticalNav from "@ui/(navbar)/VerticalNav";
import prisma from "@lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@lib/auth";

async function fetchUser(email: string | null | undefined) {
  try {
    if (!email) return null;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return { id: user.id, name: user.name };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const user = await fetchUser(session?.user?.email);
  if (!user || session?.user.UserRole != "RECIPIENT") return notFound();
  return (
    <>
      <VerticalNav user={user} />
      <section className="h-screen w-full flex justify-center items-center">
        {children}
      </section>
    </>
  );
}

export default Layout;

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
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  console.log(session);

  const user = await fetchUser(session?.user?.email);
  if (!user || session?.user.UserRole != "RECIPIENT") return notFound();
  return (
    <>
      <VerticalNav user={user} />
      <section className="flex justify-center items-center h-screen overflow-hidden pl-40 max-md:p-0">
        <div className="w-5/6 h-5/6 mt-16 ">{children}</div>
      </section>
    </>
  );
}

export default Layout;

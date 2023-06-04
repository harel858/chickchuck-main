import React from "react";
import VerticalNav from "@ui/(navbar)/VerticalNav";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@lib/auth";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
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

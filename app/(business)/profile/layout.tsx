import React from "react";
import VerticalNav from "@ui/(navbar)/VerticalNav";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@lib/auth";
import Images from "@ui/Images";
import Navbar from "@ui/(navbar)/Navbar";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user.UserRole !== "RECIPIENT") return notFound();

  return (
    <>
      <Navbar />
      <VerticalNav user={session.user} />
      <section className="h-screen w-full pl-64 flex flex-col justify-start items-center relative max-2xl:px-0 max-2xl:m-0 gap-10">
        <Images user={session.user} />
        {children}
      </section>
    </>
  );
}

export default Layout;

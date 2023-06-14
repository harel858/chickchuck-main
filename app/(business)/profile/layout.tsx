import React from "react";
import VerticalNav from "@ui/(navbar)/VerticalNav";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@lib/auth";
import Images from "@ui/Images";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user.UserRole !== "RECIPIENT") return notFound();

  return (
    <>
      <VerticalNav user={session.user} />
      <section className=" h-screen w-full flex flex-col justify-start items-center relative px-52 max-2xl:px-0 gap-5">
        <Images user={session.user} />
        {children}
      </section>
    </>
  );
}

export default Layout;

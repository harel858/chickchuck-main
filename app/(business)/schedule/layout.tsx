import React from "react";
import VerticalNav from "@ui/(navbar)/VerticalNav";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@lib/auth";
import Navbar from "@ui/(navbar)/Navbar";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user.UserRole != "RECIPIENT") return notFound();
  return (
    <>
      <Navbar />
      <VerticalNav user={session?.user} />
      <section className="flex justify-center items-center overflow-hidden pl-64 max-2xl:p-0">
        <div className="w-full h-5/6 mt-20 shadow-2xl shadow-black/50">
          {children}
        </div>
      </section>
    </>
  );
}

export default Layout;

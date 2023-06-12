import React from "react";
import VerticalNav from "@ui/(navbar)/VerticalNav";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@lib/auth";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  console.log(session?.user);

  if (session?.user.UserRole != "RECIPIENT") return notFound();
  const backgroundImageUrl =
    "https://cdn.pixabay.com/photo/2018/02/03/09/51/bulletin-board-3127287_1280.jpg"; // Replace with the URL of your dynamic background image

  return (
    <>
      <VerticalNav user={session.user} />
      <section className="flex-1 h-screen w-full flex justify-center items-center relative">
        <div
          className="mt-20 absolute inset-y-0 left-0 right-0 w-8/12 h-1/3 bg-cover bg-center z-0 mx-auto rounded-2xl"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        ></div>
        {children}
      </section>
    </>
  );
}

export default Layout;

import React from "react";
import VerticalNav from "@ui/(navbar)/VerticalNav";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@lib/auth";
import imageCompression from "browser-image-compression";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (session?.user.UserRole != "RECIPIENT") return notFound();
  const backgroundImageUrl = "<URL_TO_YOUR_IMAGE>"; // Replace with the URL of your dynamic background image
  if (session.user.image) {
  }
  return (
    <>
      <VerticalNav user={session.user} />
      <section className="h-screen w-full flex justify-center items-center relative">
        <div
          className="absolute top-0 left-0 w-full h-1/3 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        ></div>
        {children}
      </section>
    </>
  );
}

export default Layout;

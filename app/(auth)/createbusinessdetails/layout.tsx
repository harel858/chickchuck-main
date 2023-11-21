import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";

async function NewUserSignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  return (
    <section className="h-screen w-full flex justify-center items-center">
      {children}
    </section>
  );
}

export default NewUserSignupLayout;

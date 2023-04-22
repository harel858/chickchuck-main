import prisma from "@lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import Form from "./Form";

async function fetchUser(email: string | null | undefined) {
  try {
    if (!email) return null;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { Business: true },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function Page() {
  const session = await getServerSession();
  const user = await fetchUser(session?.user?.email);
  if (!user) return notFound();

  return (
    <div className="flex flex-col justify-center">
      <Form user={user} />
    </div>
  );
}

export default Page;

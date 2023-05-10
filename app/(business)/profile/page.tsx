import React from "react";
import prisma from "@lib/prisma";
import { getServerSession, Session } from "next-auth";
import UniqueLink from "./UniqueLink";

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
  const value = user?.Business[0].businessName.replace(/ /g, "-");

  return <UniqueLink link={`http://localhost:3000/${value}`} />;
}

export default Page;

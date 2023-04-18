import React from "react";
import prisma from "@lib/prisma";
import { getServerSession } from "next-auth";
import UniqueLink from "./UniqueLink";

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

async function Page() {
  const session = await getServerSession();

  const user = await fetchUser(session?.user?.email);
  const value = user?.businessName.replace(/ /g, "-");

  return <UniqueLink link={`http://localhost:3000/${value}`} />;
}

export default Page;

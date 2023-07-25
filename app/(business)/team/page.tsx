import React from "react";
import { prisma } from "@lib/prisma";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import TeamManeger from "@components/team/TeamManeger";

async function fetchUser(email: string | null | undefined) {
  try {
    if (!email) return null;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { Business: true },
    });
    if (!user) return null;

    const business = await prisma.business.findUnique({
      where: { id: user?.Business?.id },
      include: { Address: true },
    });
    if (!user || !business) return null;

    const { Business, ...rest } = user;
    return { ...rest, business };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function Page() {
  const session = await getServerSession(authOptions);

  const user = await fetchUser(session?.user?.email);
  if (!user) return notFound();

  return <TeamManeger user={user} />;
}

export default Page;

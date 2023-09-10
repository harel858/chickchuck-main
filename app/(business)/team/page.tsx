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
      include: {
        Business: {
          include: { user: { include: { Treatment: true } }, Treatment: true },
        },
      },
    });
    if (!user?.isAdmin) return null;

    const business = await prisma.business.findUnique({
      where: { id: user?.Business?.id },
    });

    if (!user || !business) return null;

    const { Business, ...rest } = user;
    return Business;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function Page() {
  const session = await getServerSession(authOptions);

  const business = await fetchUser(session?.user?.email);
  if (!business) return notFound();

  return <TeamManeger business={business} />;
}

export default Page;

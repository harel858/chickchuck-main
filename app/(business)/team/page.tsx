import React from "react";
import { prisma } from "@lib/prisma";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import TeamManeger from "@ui/team/TeamManeger";
export const revalidate = 0;

async function fetchUser(businessId: string | null | undefined) {
  try {
    if (!businessId) return null;
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: {
        user: { include: { activityDays: true } },
      },
    });

    if (!business) return null;

    return business;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function Page() {
  const session = await getServerSession(authOptions);
  const business = await fetchUser(session?.user?.businessId);
  if (!business?.user || !session?.user.isAdmin) return notFound();
  return <TeamManeger business={business} session={session} />;
}

export default Page;

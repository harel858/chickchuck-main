import React from "react";
import { prisma } from "@lib/prisma";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import TeamManeger from "@ui/team/TeamManeger";
import { getUserAccount } from "@lib/prisma/users";
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
  const user = await getUserAccount(session?.user.id);
  const access_token = user?.accounts[0]?.access_token;
  if (!access_token) {
    return notFound();
  }
  return (
    <TeamManeger
      access_token={access_token}
      business={business}
      session={session}
    />
  );
}

export default Page;

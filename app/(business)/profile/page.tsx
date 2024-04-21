import React from "react";
import { prisma } from "@lib/prisma";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Profile from "@ui/BussinessProfile/Profile";

async function fetchBussines(businessId: string) {
  try {
    const business = prisma.business.findUnique({
      where: { id: businessId },
      include: { activityDays: true },
    });
    return business;
  } catch (err: any) {
    console.log(err);
    return;
  }
}

async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user.isAdmin) return notFound();
  const business = await fetchBussines(session?.user.businessId);
  if (!business) return notFound();

  const formattedBusinessName = session.user.businessName?.replace(/\s+/g, "-"); // Replace whitespace with hyphens
  /*     ?.replace(/[^\w\-]+/g, ""); // Remove or replace non-alphanumeric characters except hyphens
   */ const value = formattedBusinessName
    ?.replace(/\-/g, " ") // Replace hyphens with whitespace
    ?.replace(/[^a-zA-Z0-9\s]/g, ""); // Remove or replace non-alphanumeric characters except whitespace

  return (
    <Profile
      business={business}
      session={session}
      user={session?.user as any}
      link={`http://localhost:3000/${formattedBusinessName}`}
    />
  );
}

export default Page;

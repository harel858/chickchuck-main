import React from "react";
import { authOptions } from "@lib/auth";
import { prisma } from "@lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Clients from "@components/clients/Clients";

async function getBusinessCustomers(userId: string | undefined) {
  if (!userId) return null;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Business: {
          include: { Customer: { include: { appointments: true } } },
        },
      },
    });
    if (!user?.Business) return null;
    const { Business } = user;
    return Business.Customer;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function Page() {
  const session = await getServerSession(authOptions);
  const customers = await getBusinessCustomers(session?.user.id);
  if (!customers || session?.user.UserRole === "CUSTOMER") return notFound();
  return <Clients customers={customers} />;
}

export default Page;

import React from "react";
import { authOptions } from "@lib/auth";
import { prisma } from "@lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Clients from "@components/clients/Clients";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getUserAccount } from "@lib/prisma/users";
dayjs.extend(customParseFormat);

async function getBusinessCustomers(userId: string | undefined) {
  if (!userId) return null;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Business: {
          include: {
            Customer: true,
          },
        },
      },
    });
    return user?.Business?.Customer;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function Page() {
  const session = await getServerSession(authOptions);
  const customersData = await getBusinessCustomers(session?.user.id);
  if (!customersData || !session) return notFound();

  const user = await getUserAccount(session?.user.id);

  const accessToken = user?.accounts[0]?.access_token;
  if (!accessToken) return notFound();

  return (
    <Clients
      accessToken={accessToken}
      session={session}
      customers={customersData}
    />
  );
}

export default Page;

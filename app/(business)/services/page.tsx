import { authOptions } from "@lib/auth";
import { prisma } from "@lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import Services from "@components/services/Services";
export const revalidate = 0;

const fetchUser = async (email: string | null | undefined) => {
  try {
    if (!email) return null;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        Treatment: { include: { RequiredDocument: true } },
        Business: { include: { RequiredDocument: true } },
      },
    });

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

async function Page() {
  const session = await getServerSession(authOptions);
  const user = await fetchUser(session?.user?.email);
  if (!user) return notFound();
  return <Services user={user} />;
}

export default Page;

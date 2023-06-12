import React from "react";
import prisma from "@lib/prisma";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import UniqueLink from "./UniqueLink";
import { notFound } from "next/navigation";

async function fetchUser(email: string | null | undefined) {
  try {
    if (!email) return null;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { Business: true },
    });
    if (!user || !user.Business) return null;
    return { name: user.Business[0].businessName };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);

  const business = await fetchUser(session?.user?.email);
  if (!business) return notFound();
  console.log(business.name);

  const value = business.name.replace(/(\s)(?!\s*$)/g, "-");
  console.log(value);

  return (
    <div>
      <UniqueLink link={`http://localhost:3000/${value}`} />
    </div>
  );
}

export default Page;

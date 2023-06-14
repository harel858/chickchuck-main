import React from "react";
import prisma from "@lib/prisma";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import UniqueLink from "./UniqueLink";
import { notFound } from "next/navigation";
import Form from "../activityTime/Form";
import QrCode from "@ui/QrCode";

async function fetchUser(email: string | null | undefined) {
  try {
    if (!email) return null;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { Business: true },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function Page() {
  const session = await getServerSession(authOptions);

  const user = await fetchUser(session?.user?.email);
  if (!user) return notFound();

  const value = user.Business[0].businessName.replace(/(\s)(?!\s*$)/g, "-");

  return (
    <div className="flex flex-row justify-center flex-wrap items-center ml-52 max-2xl:m-0 w-11/12">
      <div className="relative flex flex-nowrap items-start gap-32 max-2xl:gap-5 max-2xl:flex-col max-2xl:mt-36 max-2xl:items-center">
        <UniqueLink link={`http://localhost:3000/${value}`} />
        <Form user={user} />
      </div>
    </div>
  );
}

export default Page;

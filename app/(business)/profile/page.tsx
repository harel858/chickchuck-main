import React from "react";
import { prisma } from "@lib/prisma";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import UniqueLink from "../../../components/ui/UniqueLink";
import { notFound } from "next/navigation";
import BussinessAddress from "@ui/BussinessProfile/bussinessAddresses/bussinessAddress";
import BussinessActivity from "@ui/BussinessProfile/BussinessActivity/BussinessActivity/BussinessActivity";

async function fetchUser(email: string | null | undefined) {
  try {
    if (!email) return null;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { Business: true },
    });
    if (!user) return null;

    const business = await prisma.business.findUnique({
      where: { id: user?.Business[0].id },
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

  const value = user.business.businessName.replace(/(\s)(?!\s*$)/g, "-");

  return (
    <div className="flex justify-center flex-wrap items-center ml-52 max-2xl:m-0 w-full">
      <div className="relative flex flex-row flex-nowrap justify-center items-start gap-5 w-full max-2xl:gap-5 max-2xl:flex-col max-2xl:mt-36 max-2xl:items-center">
        <div className="flex justify-center items-center gap-5 max-2xl:flex-col-reverse max-2xl:items-center">
          <BussinessActivity user={user} />
          <UniqueLink link={`http://localhost:3000/${value}`} />
        </div>
        <BussinessAddress user={user} />
      </div>
    </div>
  );
}

export default Page;

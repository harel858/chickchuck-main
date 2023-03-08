import { notFound } from "next/navigation";
import React from "react";
import prisma from "../../lib/prisma";
import StepOne from "./stepOne";
import Tabs from "./Tabs";

type LandingPageProps = {
  params: {
    businessName: string;
  };
};

const fetchUser = async (businessName: string) => {
  try {
    const value = businessName.replace(/-/g, " ").replace(/%60/g, "`");

    const user = await prisma.user.findUnique({
      where: { businessName: value },
      include: { Treatment: true, availableSlots: true },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};

export default async function LandingPage({
  params: { businessName },
}: LandingPageProps) {
  const user = await fetchUser(businessName);
  if (!user) return notFound();
  console.log(user);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full text-white ">
      <div className="w-10/12  sm:w-8/12 md:w-6/12 lg:w-4/12 bg-gray-900 rounded-2xl border border-gray-800  harel-box ">
        <Tabs user={user} />
      </div>
    </div>
  );
}

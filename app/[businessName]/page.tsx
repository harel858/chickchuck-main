import { notFound } from "next/navigation";
import React from "react";
import prisma from "../../lib/prisma";
import Form from "./form";
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
      include: { treatment: true, appointments: true },
    });

    if (user) return user;
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
    <div className="flex flex-col items-center justify-center h-screen w-full text-white">
      <h1 className="text-4xl font-bold mb-4">Responsive Tabs Example</h1>
      <div className="w-10/12  sm:w-8/12 md:w-6/12 lg:w-4/12 bg-gray-900 rounded-2xl border border-gray-800  harel-box">
        <Tabs user={user} />
      </div>
    </div>
  );
}

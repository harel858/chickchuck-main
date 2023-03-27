import { notFound } from "next/navigation";
import React from "react";
import prisma from "../../lib/prisma";
import { UserData } from "../../types";
import Tabs from "./Tabs";

type LandingPageProps = {
  params: {
    businessName: string;
  };
};

const fetchAppointmentSlots = async (businessName: string) => {
  try {
    const value = businessName.replace(/-/g, " ").replace(/%60/g, "`");

    const user = await prisma.user.findUnique({
      where: { businessName: value },
      include: { Treatment: true, availableSlots: true },
    });
    const availableSlot = await prisma.availableSlot.findMany({
      where: {
        businessId: user?.id, // Replace with the ID of the user/business you want to book an appointment with
      },
      orderBy: [{ start: "asc" }],
    });

    return {
      availableSlot,
      treatments: user?.Treatment,
      userId: user?.id,
    } as UserData;
  } catch (err) {
    console.log(err);
  }
};

export default async function LandingPage({
  params: { businessName },
}: LandingPageProps) {
  const userData = await fetchAppointmentSlots(businessName);
  console.log(userData);

  if (!userData?.userId) return notFound();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full text-white ">
      <div className="w-10/12  sm:w-8/12 md:w-6/12 lg:w-4/12 bg-gray-900 rounded-2xl border border-gray-800  harel-box ">
        <Tabs userData={userData} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  const params = users?.map((user) => ({
    businessName: user.businessName.toString(),
  }));

  return params;
}

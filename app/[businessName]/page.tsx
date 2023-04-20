import { AvailableSlot, Treatment } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import prisma from "../../lib/prisma";
import { UserData } from "../../types/types";
import Tabs from "./Tabs";
export const dynamic = "force-static";

type LandingPageProps = {
  params: {
    businessName: string;
  };
};

const fetchAppointmentSlots = async (businessName: string) => {
  try {
    const value = businessName.replace(/-/g, " ").replace(/%60/g, "`");
    console.log(value);

    const business = await prisma.business.findUnique({
      where: { businessName: value },
      include: { user: { include: { Treatment: true } } },
    });
    if (!business) return null;
    let UsersData: UserData[] = [];
    for (let i = 0; i < business.user.length; i++) {
      let result = await prisma.availableSlot.findMany({
        where: {
          userId: business.user[i]?.id, // Replace with the ID of the user/business you want to book an appointment with
        },
        orderBy: [{ start: "asc" }],
      });
      UsersData.push({
        name: business.user[i].name,
        AvailableSlot: result,
        treatments: business.user[i].Treatment,
        userId: business.user[i].id,
      });
    }

    return UsersData;
  } catch (err) {
    console.log(err);
  }
};

export default async function LandingPage({
  params: { businessName },
}: LandingPageProps) {
  const userData = await fetchAppointmentSlots(businessName);
  console.log(userData);

  if (!userData) return notFound();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full text-white ">
      <div className="w-10/12  sm:w-8/12 md:w-6/12 lg:w-4/12 bg-gray-900 rounded-2xl border border-gray-800  harel-box ">
        <Tabs userData={userData} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const business = await prisma.business.findMany();
  const params = business?.map((item) => ({
    businessName: item.businessName.toString(),
  }));

  return params;
}

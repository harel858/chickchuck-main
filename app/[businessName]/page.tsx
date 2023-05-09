import { notFound } from "next/navigation";
import React from "react";
import prisma from "../../lib/prisma";
import { UserData } from "../../types/types";
import Tabs from "./Tabs";
import Stepper from "@ui/Stepper";
import LargeHeading from "@ui/LargeHeading";
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
    <div className="flex flex-col items-center justify-center gap-20 h-screen w-full text-white">
      <LargeHeading className="opacity-6" size={"sm"}>
        Queue Booking
      </LargeHeading>
      <Stepper userData={userData} />
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

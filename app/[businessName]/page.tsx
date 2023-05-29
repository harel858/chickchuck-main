import { notFound } from "next/navigation";
import React from "react";
import prisma from "../../lib/prisma";
import { UserData } from "../../types/types";
import Stepper from "@ui/Stepper";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import Verification from "@components/Verification";
export const dynamic = "force-static";

type LandingPageProps = {
  params: {
    businessName: string;
  };
};

const fetchAppointmentSlots = async (businessName: string) => {
  try {
    const value = businessName.replace(/-/g, " ").replace(/%60/g, "`");

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
  const session = await getServerSession(authOptions);
  console.log(session);
  const userData = await fetchAppointmentSlots(businessName);

  if (!userData) return notFound();

  return (
    <div className="flex flex-col items-center justify-center gap-20 h-screen w-full text-white">
      <div className="w-1/2 max-md:w-11/12 flex justify-center content-center items-center dark:bg-orange-400/70 bg-orange-400/80 p-10 rounded-3xl shadow-2xl dark:shadow-white/10 ">
        {!session || session?.user.UserRole != "RECIPIENT" ? (
          <Verification userData={userData} />
        ) : (
          <Stepper userData={userData} />
        )}
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

import { notFound } from "next/navigation";
import React from "react";
import { prisma } from "@lib/prisma";
import Booking from "../../components/landingPage/Booking";
import { UserData } from "types/types";
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
      const user = await prisma.user.findUnique({
        where: { id: business.user[i]?.id },
        include: {
          Treatment: true,
          availableSlots: { orderBy: [{ start: "asc" }] },
        },
      });

      if (!user) return null;

      UsersData.push({
        name: user.name,
        AvailableSlot: user.availableSlots,
        treatments: user.Treatment,
        userId: user.id,
        activityDays: user.activityDays,
      });
    }
    console.log("UsersData", UsersData);

    return UsersData;
  } catch (err) {
    console.log(err);
  }
};

export default async function LandingPage({
  params: { businessName },
}: LandingPageProps) {
  const userData = await fetchAppointmentSlots(businessName);
  console.log("userData", userData);

  if (!userData) return notFound();

  return <Booking userData={userData} />;
}

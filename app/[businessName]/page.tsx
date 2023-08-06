import { notFound } from "next/navigation";
import React from "react";
import { prisma } from "@lib/prisma";
import Booking from "../../components/landingPage/Booking";
import { BusinessData, UserData } from "types/types";
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
    let usersData: UserData[] = [];
    for (let i = 0; i < business.user.length; i++) {
      const user = await prisma.user.findUnique({
        where: { id: business.user[i]?.id },
        include: {
          Treatment: true,
          availableSlots: { orderBy: [{ start: "asc" }] },
        },
      });

      if (!user) return null;

      usersData.push({
        name: user.name,
        AvailableSlot: user.availableSlots,
        treatments: user.Treatment,
        userId: user.id,
        activityDays: user.activityDays,
      });
    }
    console.log("UsersData", usersData);

    return { usersData, business };
  } catch (err) {
    console.log(err);
  }
};

export default async function LandingPage({
  params: { businessName },
}: LandingPageProps) {
  const businessData = await fetchAppointmentSlots(businessName);
  console.log("userData", businessData);

  if (!businessData) return notFound();

  return <Booking businessData={businessData} />;
}

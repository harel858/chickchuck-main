import { notFound } from "next/navigation";
import React from "react";
import prisma from "@lib/prisma";
import Booking from "../../components/landingPage/Booking";

import { fetchAppointmentSlots } from "@lib/prisma/fetchAppointmentSlots";
type LandingPageProps = {
  params: {
    businessName: string;
  };
};

export default async function LandingPage({
  params: { businessName },
}: LandingPageProps) {
  const userData = await fetchAppointmentSlots(businessName);

  if (!userData) return notFound();

  return <Booking userData={userData} />;
}

export async function generateStaticParams() {
  const business = await prisma.business.findMany();
  const params = business?.map((item) => ({
    businessName: item.businessName.toString(),
  }));

  return params;
}

import { notFound } from "next/navigation";
import React from "react";
import NavBar from "../../(navbar)/Navbar";
import prisma from "../../../../lib/prisma";

type LandingPageProps = {
  params: {
    businessName: string;
  };
  children: React.ReactNode;
};

const fetchAppointmentSlots = async (businessName: string) => {
  console.log(`businessName:${businessName}`);

  try {
    const value = businessName
      .replace(/-/g, " ")
      .replace(/%20/g, " ")
      .replace(/%60/g, "`");
    console.log(`value:${value}`);

    const user = await prisma.user.findUnique({
      where: { businessName: value },
    });

    return user;
  } catch (err) {
    console.log(err);
  }
};

export default async function HomeLayout({
  params: { businessName },
  children,
}: LandingPageProps) {
  const userData = await fetchAppointmentSlots(businessName);
  console.log(userData);

  if (!userData) return notFound();

  return (
    <>
      <NavBar user={userData} />
      <section className="w-full flex pl-64 justify-center content-center">
        {children}
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  const params = users?.map((user) => ({
    businessName: user.businessName.toString(),
  }));

  return params;
}

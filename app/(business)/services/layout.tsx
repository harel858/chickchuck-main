import React from "react";
import VerticalNav from "@ui/(navbar)/VerticalNav";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@lib/auth";
import { prisma } from "@lib/prisma";
import { UserData } from "types/types";
import Navbar from "@ui/(navbar)/Navbar";
import PlusButton from "@ui/(navbar)/specialOperations/plusButton/PlusButton";

const fetchAppointmentSlots = async (id: string | undefined) => {
  if (!id) return null;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        Business: {
          include: { user: { include: { Treatment: true } }, Customer: true },
        },
      },
    });
    if (!user || !user.Business) return null;
    const { Business } = user;
    let usersData: UserData[] = [];
    for (let i = 0; i < Business.user.length; i++) {
      const user = await prisma.user.findUnique({
        where: { id: Business.user[i]?.id },
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

    return { usersData, business: Business };
  } catch (err) {
    console.log(err);
  }
};

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const businessData = await fetchAppointmentSlots(session?.user.id);
  if (session?.user.UserRole !== "RECIPIENT" || !businessData)
    return notFound();

  return (
    <>
      {/* @ts-ignore  */}
      <Navbar session={session} />
      <PlusButton businessData={businessData} />
      {/* @ts-ignore  */}
      <VerticalNav user={session.user} />
      <section className="h-screen w-full flex justify-center items-center">
        {children}
      </section>
    </>
  );
}

export default Layout;

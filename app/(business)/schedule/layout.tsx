import React from "react";
import VerticalNav from "@ui/(navbar)/VerticalNav";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@lib/auth";
import Navbar from "@ui/(navbar)/Navbar";
import { UserData } from "types/types";
import { prisma } from "@lib/prisma";
import PlusButton from "@ui/(navbar)/specialOperations/plusButton/PlusButton";

const fetchAppointmentSlots = async (id: string | undefined) => {
  if (!id) return null;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        Business: {
          include: {
            user: { include: { Treatment: true } },
            Customer: true,
            activityDays: true,
          },
        },
        appointments: {
          include: { customer: true, treatment: true, appointmentSlot: true },
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
        activityDays: [],
      });
    }

    console.log("UsersData", usersData);

    return { usersData, business: Business, user };
  } catch (err) {
    console.log(err);
  }
};

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  console.log("session.user", session);
  if (!session) return notFound();
  const value = session?.user.business?.businessName.replace(
    /(\s)(?!\s*$)/g,
    "-"
  );
  if (!value) throw new Error("value is missing");
  return (
    <>
      {/* @ts-ignore  */}
      <Navbar session={session} link={value} />
      <PlusButton />

      <section className="flex justify-center items-center overflow-hidden">
        <div className="w-full mt-20 overflow-hidden">{children}</div>
      </section>
    </>
  );
}

export default Layout;

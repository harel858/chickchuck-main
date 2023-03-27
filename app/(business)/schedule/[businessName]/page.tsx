import { notFound } from "next/navigation";
import React from "react";
import prisma from "../../../../lib/prisma";
import { BusinessNameProps } from "../../../../types";
import Loading from "../loading";
import Calendar from "./(calendar)/Calendar";

const fetchUser = async (businessName: string) => {
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

    const appointments = await prisma.appointment.findMany({
      where: { userId: user?.id },
      include: {
        appointmentSlot: true,
        treatment: true,
        customer: true,
      },
    });

    return appointments;
  } catch (err) {
    console.log(err);
  }
};

async function ScheduleListPage({
  params: { businessName },
}: BusinessNameProps) {
  const appointments = await fetchUser(businessName);
  console.log(appointments);

  if (!appointments) return notFound();
  console.log(appointments);

  return (
    <div>
      <div className="flex justify-center align-center content-center w-11/12">
        <Calendar appointments={appointments} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  const params = users?.map((user) => ({ id: user.id.toString() }));

  return params;
}

export default ScheduleListPage;

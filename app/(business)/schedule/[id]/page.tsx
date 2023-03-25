import React from "react";
import prisma from "../../../../lib/prisma";
import { IdProps } from "../../../../types";
import Loading from "../loading";
import Calendar from "./(calendar)/Calendar";

async function fetchUser(id: any) {
  const appointments = await prisma.appointment.findMany({
    where: {
      treatment: {
        businessId: id, // The ID of the user's business
      },
    },
    include: {
      customer: true,
      treatment: true,
    },
  });
  return appointments;
}

async function ScheduleListPage({ params: { id } }: IdProps) {
  const appointments = await fetchUser(id);
  console.log(appointments);

  return (
    <div>
      {appointments ? (
        <div className="flex justify-center align-center content-center w-11/12">
          <Calendar appointments={appointments} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  const params = users?.map((user) => ({ id: user.id.toString() }));

  return params;
}

export default ScheduleListPage;

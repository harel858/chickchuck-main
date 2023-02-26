import React from "react";
import prisma from "../../../../lib/prisma";
import { IdProps, User } from "../../../../types";
import Loading from "../loading";
import Calendar from "../(calendar)/Calendar";

async function fetchUser(id: any) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { appointments: true, treatment: true },
  });
  if (user) {
    return user;
  }
}

async function ScheduleListPage({ params: { id } }: IdProps) {
  const user = await fetchUser(id);
  console.log(user);

  return (
    <>
      {user ? (
        <div className="flex justify-center align-center content-center w-11/12">
          <Calendar appointments={user?.appointments} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  const params = users?.map((user) => ({ id: user.id.toString() }));

  return params;
}

export default ScheduleListPage;

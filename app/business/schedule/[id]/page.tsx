import React from "react";
import prisma from "../../../../lib/prisma";
import { IdProps, User } from "../../../../types";

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

  return (
    <div>
      {user?.appointments?.map((item) => {
        console.log(item);
        return <p>{item.name}</p>;
      })}
    </div>
  );
}

export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  const params = users?.map((user) => ({ id: user.id.toString() }));

  return params;
}

export default ScheduleListPage;

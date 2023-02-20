import { notFound } from "next/navigation";
import React from "react";
import prisma from "../../../../lib/prisma";
import { IdProps } from "../../../../types";
import Treatment from "./Treatment";

export const revalidate = 1;

async function fetchUser(id: any) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { appointments: true, treatment: true },
  });
  if (user) {
    return user;
  }
}

async function PriceListPage({ params: { id } }: IdProps) {
  const user = await fetchUser(id);
  console.log(user);

  if (!user) return notFound();

  return (
    <div>
      {user?.treatment?.map((item: any) => {
        console.log(item);
        return <Treatment key={item.id} item={item} />;
      })}
    </div>
  );
}

export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  const params = users?.map((user) => ({ id: user.id.toString() }));

  return params;
}

export default PriceListPage;

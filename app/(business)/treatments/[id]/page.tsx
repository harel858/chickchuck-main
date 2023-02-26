import { notFound } from "next/navigation";
import React from "react";
import prisma from "../../../../lib/prisma";
import { IdProps } from "../../../../types";
import Treatment from "./Treatment";
import ProfileImage from "./ProfileImage";

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
    <div className="p-x-4 p-y-4">
      <ProfileImage
        img={`https://cdn.pixabay.com/photo/2016/04/25/07/49/man-1351346_960_720.png`}
      />
      <div>
        <ul>
          {user?.treatment?.map((item: any) => {
            console.log(item);
            return <Treatment key={item.id} item={item} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  const params = users?.map((user) => ({ id: user.id.toString() }));

  return params;
}

export default PriceListPage;

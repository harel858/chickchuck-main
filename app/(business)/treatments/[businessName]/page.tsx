import { notFound } from "next/navigation";
import React from "react";
import prisma from "../../../../lib/prisma";
import Treatment from "./Treatment";
import ProfileImage from "./ProfileImage";
import { BusinessNameProps } from "../../../../types";

export const revalidate = 1;

const fetchUser = async (businessName: string) => {
  try {
    const value = businessName
      .replace(/-/g, " ")
      .replace(/%20/g, " ")
      .replace(/%60/g, "`");
    console.log(`value:${value}`);

    const user = await prisma.user.findUnique({
      where: { businessName: value },
      include: { Treatment: true },
    });

    return user;
  } catch (err) {
    console.log(err);
  }
};

async function PriceListPage({ params: { businessName } }: BusinessNameProps) {
  const user = await fetchUser(businessName);

  if (!user) return notFound();

  return (
    <div className="p-x-4 p-y-4">
      <ProfileImage
        img={`https://cdn.pixabay.com/photo/2016/04/25/07/49/man-1351346_960_720.png`}
      />
      <div>
        <ul>
          {user?.Treatment?.map((item) => {
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

import { notFound } from "next/navigation";
import React from "react";
import prisma from "../../../../lib/prisma";
import Treatment from "./Treatment";
import ProfileImage from "../../(navbar)/ProfileImage";
import { BusinessNameProps } from "../../../../types/types";
import TreatmentsForm from "../treatmentsForm";

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
    <div className="flex flex-col justify-center align-center content-center items-center ">
      <ProfileImage user={user} />
      <div>
        <TreatmentsForm user={user} />
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

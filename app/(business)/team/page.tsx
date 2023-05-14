import prisma from "@lib/prisma";
import { Avatar } from "@mui/material";
import ProfileImage from "@ui/(navbar)/ProfileImage";
import TeamForm from "@ui/teamForm";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
export const revalidate = 1;

const fetchBusiness = async (email: string | null | undefined) => {
  try {
    if (!email) return null;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { Business: true },
    });
    const business = await prisma.business.findUnique({
      where: { id: user?.Business[0].id },
      include: { user: true },
    });

    return { user, business };
  } catch (err) {
    console.log(err);
    return null;
  }
};

async function Page() {
  const session = await getServerSession();
  const data = await fetchBusiness(session?.user?.email);
  if (!data?.user || !data.business) return notFound();
  const { user, business } = data;
  return (
    <div className="flex flex-col justify-center align-center content-center items-center ">
      <div>
        <TeamForm business={business} />
        <ul>
          {data.business.user?.map((item) => {
            console.log(item);
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Page;

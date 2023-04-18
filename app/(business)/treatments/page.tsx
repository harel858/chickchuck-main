import prisma from "@lib/prisma";
import ProfileImage from "@ui/(navbar)/ProfileImage";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import Treatment from "./Treatment";
import TreatmentsForm from "./treatmentsForm";
export const revalidate = 1;

const fetchUser = async (email: string | null | undefined) => {
  try {
    if (!email) return null;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { Treatment: true },
    });

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

async function Page() {
  const session = await getServerSession();
  const user = await fetchUser(session?.user?.email);
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

export default Page;

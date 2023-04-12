import { notFound } from "next/navigation";
import React from "react";
import NavBar from "../../(navbar)/Navbar";
import prisma from "../../../../lib/prisma";

type LandingPageProps = {
  params: {
    businessName: string;
  };
  children: React.ReactNode;
};

const fetchUser = async (businessName: string) => {
  console.log(businessName);

  try {
    const value = businessName
      .replace(/-/g, " ")
      .replace(/%20/g, " ")
      .replace(/%60/g, "`");
    console.log(`value:${value}`);

    const user = await prisma.user.findUnique({
      where: { businessName: value },
    });

    return user;
  } catch (err) {
    console.log(err);
  }
};

export default async function HomeLayout({
  params: { businessName },
  children,
}: LandingPageProps) {
  const userData = await fetchUser(businessName);
  console.log(userData);

  if (!userData) return notFound();

  return (
    <>
      <NavBar user={userData} />
      <div className="flex mt-32 justify-center align-center content-center">
        {children}
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  const params = users?.map((user) => ({
    businessName: user.businessName.toString(),
  }));

  return params;
}

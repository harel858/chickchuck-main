import React from "react";
import prisma from "../../lib/prisma";
import Form from "./form";

type LandingPageProps = {
  params: {
    businessName: string;
  };
};

const fetchUser = async (businessName: string) => {
  try {
    const value = businessName.replace(/-/g, " ").replace(/%60/g, "`");

    const user = await prisma.user.findUnique({
      where: { businessName: value },
      include: { treatment: true, appointments: true },
    });
    if (user) return user;
  } catch (err) {
    console.log(err);
  }
};

export default async function LandingPage({
  params: { businessName },
}: LandingPageProps) {
  const user = await fetchUser(businessName);

  return (
    <div>
      <Form />
    </div>
  );
}

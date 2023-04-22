import { User } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import prisma from "../../../../lib/prisma";
import Form from "../Form";

const fetchUser = async (businessName: string) => {
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

async function Page({
  params: { businessName },
}: {
  user: User;
  params: {
    businessName: string;
  };
}) {
  const user = await fetchUser(businessName);
  if (!user) return notFound();

  return (
    <div className="flex flex-col justify-center">
      <Form user={user} />
    </div>
  );
}

export default Page;

import { notFound } from "next/navigation";
import React from "react";
import prisma from "../../../../lib/prisma";
import { IdProps } from "../../../../types";
import Form from "../Form";

async function fetchUser(id: any) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (user) {
    return user;
  }
}

async function page({ params: { id } }: IdProps) {
  const user = await fetchUser(id);
  if (!user) return notFound();

  return (
    <div className="flex flex-col justify-center ">
      <Form user={user} />
    </div>
  );
}

export default page;

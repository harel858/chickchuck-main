import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { User } from "@prisma/client";
import UniqueLink from "../UniqueLink";
import prisma from "../../../../lib/prisma";
import { notFound } from "next/navigation";

const fetchUser = async (businessName: string) => {
  console.log(`businessName:${businessName}`);

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

async function Business({
  params: { businessName },
}: {
  user: User;
  params: {
    businessName: string;
  };
}) {
  const user = await fetchUser(businessName);
  if (!user) return notFound();

  const value = user.businessName.replace(/ /g, "-");
  console.log(value);

  return (
    <>
      <main className="flex align-center justify-center mt-4">
        <UniqueLink link={`http://localhost:3000/${value}`} />
      </main>
    </>
  );
}

export default Business;

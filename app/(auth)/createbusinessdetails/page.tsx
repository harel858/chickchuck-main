import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { notFound } from "next/navigation";
import Container from "@ui/Init/Container";
import MaxWidthWrapper from "@components/MaxWidthWrapper";

async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();
  return (
    <MaxWidthWrapper classNames="flex justify-center items-center">
      <Container session={session} />
    </MaxWidthWrapper>
  );
}

export default Page;

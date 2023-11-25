import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { notFound } from "next/navigation";
import InitDetails from "@ui/Init/InitDetails";
import Container from "@ui/Init/Container";

async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();
  return <Container session={session} />;
}

export default Page;

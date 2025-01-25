import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { notFound } from "next/navigation";
import Container from "@ui/Init/Container";
import MaxWidthWrapper from "@components/MaxWidthWrapper";

interface PageProps {
  params: {
    locale: string;
  };
}

async function Page({ params: { locale } }: PageProps) {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  if (!session) return notFound();
  return (
    <MaxWidthWrapper classNames="flex justify-center items-center">
      <Container locale={locale} session={session} />
    </MaxWidthWrapper>
  );
}

export default Page;

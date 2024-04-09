import React, { ReactNode } from "react";
import { prisma } from "@lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { getImages, getImages2 } from "@lib/aws/s3";
import ProfileNav from "@ui/(navbar)/ProfileNav";
import Images from "@ui/Images";
import BackgroundImage from "@components/landingPage/BackgroundImage";

type LandingPageProps = {
  children: ReactNode;
  params: {
    businessName: string;
  };
};

async function Layout({
  children,
  params: { businessName },
}: LandingPageProps) {
  return (
    <section className="flex flex-col justify-center items-center gap-7 pb-10">
      {children}
    </section>
  );
}

export default Layout;

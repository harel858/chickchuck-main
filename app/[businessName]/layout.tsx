import BackgroundImage from "@components/landingPage/BackgroundImage";
import { getImage } from "@lib/aws/s3";
import { prisma } from "@lib/prisma";
import React, { ReactNode } from "react";
import { LandingPageData } from "types/types";
import { Lobster_Two } from "next/font/google";
import { notFound } from "next/navigation";
const lobster = Lobster_Two({ weight: ["400"], subsets: ["latin"] });

type LandingPageProps = {
  children: ReactNode;
  params: {
    businessName: string;
  };
};
const bucketName = process.env.BUCKET_NAME!;

async function getBusiness(params: string) {
  const value = params.replace(/-/g, " ");
  let urls: {
    backgroundImage: string;
    profileImage: string;
  } | null = null;
  try {
    const business = await prisma.business.findUnique({
      where: { businessName: value },
      include: { Images: true },
    });
    if (!business) return null;
    if (business?.Images) {
      const params = {
        Bucket: bucketName,
        Key: {
          profileImgName: business.Images.profileImgName,
          backgroundImgName: business.Images.backgroundImgName,
        },
      };
      const res = await getImage(params);
      urls = res;
    }
    const result = { ...business, Images: urls };
    const { id, ...rest } = result;
    return rest as LandingPageData;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function Layout({
  children,
  params: { businessName },
}: LandingPageProps) {
  const business = await getBusiness(businessName);
  if (!business) return notFound();
  return (
    <section className="flex flex-col justify-center items-center">
      <BackgroundImage business={business} lobster={lobster.className} />
      {children}
    </section>
  );
}

export default Layout;

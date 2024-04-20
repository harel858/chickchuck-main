import React from "react";
import { notFound } from "next/navigation";
import AppointmentSteps from "@components/AppointmentSteps";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import NavButtons from "@ui/NavButtons";
import { getImages2 } from "@lib/aws/s3";
import Images from "@ui/Images";
import BackgroundImage from "@components/landingPage/BackgroundImage";
import { prisma } from "@lib/prisma";

type LandingPageProps = {
  params: {
    businessName: string;
  };
};
const bucketName = process.env.BUCKET_NAME!;

async function getBusiness(params: string) {
  const value = decodeURIComponent(
    params?.replace(/\-/g, " ") // Replace hyphens with whitespace
  );

  let urls: {
    profileUrls: string;
    backgroundUrls: string[];
  } | null = null;
  try {
    const business = await prisma.business.findUnique({
      where: { businessName: value },
      include: {
        Images: true,
        Treatment: true,
        activityDays: true,
        user: { include: { activityDays: true } },
      },
    });
    if (!business?.user) return null;

    if (business?.Images) {
      const params = business.Images.map((element) => ({
        Bucket: bucketName,
        Key: {
          profileImgName: element?.profileImgName || "",
          backgroundImgName: element?.backgroundImgName || "",
        },
      }));
      const res = await getImages2(params);
      urls = res;
    }
    /*  const result = { ...business, urls };
    const { id, ...rest } = result; */
    return { business, urls };
  } catch (err) {
    console.log(err);
    return null;
  }
}
export default async function LandingPage({
  params: { businessName },
}: LandingPageProps) {
  const result = await getBusiness(businessName);

  const session = await getServerSession(authOptions);

  if (!result) return notFound();
  const { business, urls } = result;
  return (
    <>
      {session?.user.isAdmin ? (
        <Images urls={urls} session={session} />
      ) : (
        <BackgroundImage urls={urls} />
      )}
      <NavButtons business={business} />
      <AppointmentSteps
        business={business}
        freeBusy={session?.user.access_token || ""}
      />
    </>
  );
}

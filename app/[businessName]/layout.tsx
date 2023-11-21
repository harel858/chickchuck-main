import React, { ReactNode } from "react";
import BackgroundImage from "@components/landingPage/BackgroundImage";
import ProfileNav from "@ui/(navbar)/ProfileNav";
import { getImage } from "@lib/aws/s3";
import { prisma } from "@lib/prisma";
import { LandingPageData } from "types/types";
import { notFound } from "next/navigation";
import { Lobster_Two } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import Images from "@ui/Images";
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
      include: { Images: true, Address: true },
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
  const session = await getServerSession(authOptions);
  if (!business) return notFound();
  return (
    <>
      {/*       <ProfileNav business={business} />
       */}{" "}
      <section className="flex flex-col justify-start items-center gap-5">
        {session?.user.isAdmin ? (
          <Images user={session.user} />
        ) : (
          <BackgroundImage business={business} lobster={lobster.className} />
        )}
        {children}
      </section>
    </>
  );
}

export default Layout;

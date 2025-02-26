import React from "react";
import { notFound } from "next/navigation";
import AppointmentSteps from "@components/AppointmentSteps";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { getImages2 } from "@lib/aws/s3";
import { prisma } from "@lib/prisma";
import GallerySection from "@components/landingPage/GallerySection";
import { calendar_v3 } from "googleapis";
import { setupGoogleCalendarClient } from "@lib/google/client";
import { getEventsByCustomer } from "@lib/google/getEventsByCustomer";
import { AppointmentRequest, Customer, Treatment, User } from "@prisma/client";
import { isGoogleEvent } from "@ui/(navbar)/specialOperations/notifications/utils/typeGourd";
import dayjs from "dayjs";
import AdminImages from "@ui/Images";
import TopHead from "@components/landingPage/BackgroundImage";

type LandingPageProps = {
  params: {
    businessName: string;
  };
};

const bucketName = process.env.BUCKET_NAME!;

async function getBusiness(params: string) {
  const value = decodeURIComponent(params?.replace(/\-/g, " "));

  let urls: {
    profileUrls: string;
    backgroundUrls: string;
    galleryImgUrls: { url: string; fileName: string }[];
  } | null = null;

  try {
    const business = await prisma.business.findUnique({
      where: { businessName: value },
      include: {
        Images: true,
        Treatment: true,
        activityDays: true,
        user: { include: { activityDays: true, accounts: true } },
      },
    });

    if (!business?.user) return null;

    const admin = business.user.find((item) => item.accounts.length !== 0);
    const account = admin?.accounts[0];

    if (business?.Images) {
      const params = business.Images.map((element) => ({
        Bucket: bucketName,
        Key: {
          profileImgName: element?.profileImgName || "",
          backgroundImgName: element?.backgroundImgName || "",
          galleryImgName: element?.galleryImgName || "",
        },
      }));

      const res = await getImages2(params);
      urls = res;
    }

    return { business, urls, account: account?.access_token };
  } catch (err) {
    console.error(err);
    return null;
  }
}

const getCustomerEvents = async (id: string, access_token: string) => {
  try {
    const googleClient = setupGoogleCalendarClient(access_token);
    const events = await getEventsByCustomer(googleClient, id);
    console.log("events", events);
    console.log("getCustomerEventsid", id);

    return events;
  } catch (error) {
    console.error("Error loading Google Calendar API:", error);
  }
};

const getAppointmentRequest = async (
  customerId: string,
  businessId: string
) => {
  try {
    const appointmentRequest = prisma.appointmentRequest.findMany({
      where: { customerId: customerId, businessId: businessId },
      include: { customer: true, treatment: true, user: true },
    });
    return appointmentRequest || [];
  } catch (error) {
    console.error("Error loading prisma API:", error);
  }
};

export default async function LandingPage({
  params: { businessName },
}: LandingPageProps) {
  console.log("businessName", businessName);

  const result = await getBusiness(businessName);
  const session = await getServerSession(authOptions);

  if (!result || !result.account) return notFound();

  const { business, urls } = result;
  const isAdmin =
    !!session?.user?.isAdmin && session.user.businessId === business.id;
  const adminUserId = isAdmin ? session?.user.id : false;
  const freeBusy = result.account;

  let customerAppointments: (
    | calendar_v3.Schema$Event
    | (AppointmentRequest & {
        treatment: Treatment;
        customer: Customer;
        user: User;
      })
  )[] = [];

  if (session && !session?.user.UserRole) {
    const googleAppointments = await getCustomerEvents(
      session?.user.id,
      result.account
    );
    console.log("session", session);
    const appointmentRequest =
      (await getAppointmentRequest(session.user.id, business.id)) || [];
    console.log("appointmentRequest", appointmentRequest);

    if (googleAppointments) {
      customerAppointments = [
        ...customerAppointments,
        ...googleAppointments,
        ...appointmentRequest,
      ].sort((a, b) => {
        const dateA = isGoogleEvent(a)
          ? new Date(dayjs(a.created).toISOString()).getTime()
          : new Date(dayjs(a.created).toISOString()).getTime();
        const dateB = isGoogleEvent(b)
          ? new Date(dayjs(b.created).toISOString()).getTime()
          : new Date(dayjs(b.created).toISOString()).getTime();
        return dateB - dateA;
      });
    }
  }

  return (
    <>
      {isAdmin ? (
        <AdminImages business={business} urls={urls} session={session} />
      ) : (
        <TopHead business={business} urls={urls} />
      )}

      <AppointmentSteps
        business={business}
        freeBusy={freeBusy}
        session={session}
        customerAppointments={customerAppointments}
        freebusy={freeBusy}
      />
      <GallerySection
        adminUserId={adminUserId}
        isAdmin={isAdmin}
        freeBusy={freeBusy}
        urls={urls}
        customerAppointments={customerAppointments}
        session={session}
      />
    </>
  );
}

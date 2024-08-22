"use client";
import React, { useState } from "react";
import Gallery from "@components/landingPage/Gallery";
import UploadToGallery from "@components/landingPage/UploadToGallery";
import { calendar_v3 } from "googleapis";
import { Session } from "next-auth";
import { AppointmentRequest, Customer, Treatment, User } from "@prisma/client";
import GallerySlider from "./GallerySlider";
function GallerySection({
  isAdmin,
  urls,
  adminUserId,
  customerAppointments,
  session,
  freeBusy,
}: {
  isAdmin: boolean;
  urls: {
    profileUrls: string;
    backgroundUrls: string;
    galleryImgUrls: { url: string; fileName: string }[];
  } | null;
  adminUserId: string | false;
  freeBusy: string;
  customerAppointments:
    | (
        | calendar_v3.Schema$Event
        | (AppointmentRequest & {
            treatment: Treatment;
            customer: Customer;
            user: User;
          })
      )[]
    | null
    | undefined;
  session: Session | null;
}) {
  console.log("customerAppointments", customerAppointments);

  const [galleryOrUpload, setGalleryOrUpload] = useState<boolean>(
    isAdmin && urls?.galleryImgUrls.length === 0
  );
  return (
    <>
      {isAdmin && galleryOrUpload ? (
        <UploadToGallery
          adminUserId={adminUserId}
          urls={urls}
          setGalleryOrUpload={setGalleryOrUpload}
        />
      ) : (
        <GallerySlider
          adminUserId={adminUserId}
          setGalleryOrUpload={setGalleryOrUpload}
          urls={urls}
          customerAppointments={customerAppointments}
          session={session}
          freebusy={freeBusy}
        />
      )}
    </>
  );
}

export default GallerySection;

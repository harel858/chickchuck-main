"use client";
import React, { useState } from "react";
import Gallery from "@components/landingPage/Gallery";
import UploadToGallery from "@components/landingPage/UploadToGallery";

function GallerySection({
  isAdmin,
  urls,
  adminUserId,
}: {
  isAdmin: boolean;
  urls: {
    profileUrls: string;
    backgroundUrls: string;
    galleryImgUrls: string[];
  } | null;
  adminUserId: string | false;
}) {
  console.log("urls", urls);

  const [galleryOrUpload, setGalleryOrUpload] = useState<boolean>(
    isAdmin && urls?.galleryImgUrls.length === 0
  );
  return (
    <>
      {galleryOrUpload ? (
        <UploadToGallery
          adminUserId={adminUserId}
          urls={urls}
          setGalleryOrUpload={setGalleryOrUpload}
        />
      ) : (
        <Gallery setGalleryOrUpload={setGalleryOrUpload} urls={urls} />
      )}
    </>
  );
}

export default GallerySection;

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
    galleryImgUrls: { url: string; fileName: string }[];
  } | null;
  adminUserId: string | false;
}) {
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
        <Gallery
          adminUserId={adminUserId}
          setGalleryOrUpload={setGalleryOrUpload}
          urls={urls}
        />
      )}
    </>
  );
}

export default GallerySection;

"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./customerAppointments.module.css";
import React, { useState } from "react";
import Slider from "react-slick";
import { Button } from "@ui/Button";
import { BiEdit } from "react-icons/bi";
import { Image } from "antd";
import CustomerSignIn from "./CustomerSignIn";
import { calendar_v3 } from "googleapis";
import { Session } from "next-auth";
import CustomerAppointments from "./CustomerAppointments";
import { AppointmentRequest, Customer, Treatment, User } from "@prisma/client";

function Responsive({
  urls,
  setGalleryOrUpload,
  adminUserId,
  freebusy,
  customerAppointments,
  session,
}: {
  urls: {
    profileUrls: string;
    backgroundUrls: string;
    galleryImgUrls: {
      url: string;
      fileName: string;
    }[];
  } | null;
  session: Session | null;
  freebusy: string;
  adminUserId: string | false;
  setGalleryOrUpload: React.Dispatch<React.SetStateAction<boolean>>;
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
}) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImages, setPreviewImages] = useState<
    {
      url: string;
      fileName: string;
    }[]
  >([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleImageClick = (index: number) => {
    setPreviewImages(urls ? urls.galleryImgUrls : []);
    setCurrentImageIndex(index);
    setPreviewVisible(true);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 w-11/12">
      <div className="slider-container w-1/2 max-md:w-10/12">
        {urls?.galleryImgUrls && urls.galleryImgUrls.length > 0 ? (
          <>
            <Slider {...settings}>
              {urls.galleryImgUrls.map((img, index) => (
                <div
                  key={index}
                  className="image-container"
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    width={200}
                    src={img.url}
                    preview={false}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
              ))}
            </Slider>
            <Image.PreviewGroup
              preview={{
                visible: previewVisible,
                current: currentImageIndex,
                onVisibleChange: (visible) => setPreviewVisible(visible),
              }}
            >
              {previewImages.map((img, index) => (
                <Image key={index} src={img.url} style={{ display: "none" }} />
              ))}
            </Image.PreviewGroup>
          </>
        ) : (
          <p>No images available</p>
        )}
      </div>
      {adminUserId ? (
        <Button
          className="flex justify-center items-center gap-2 bg-slate-100 text-black hover:bg-slate-100/50"
          variant="default"
          onClick={() => setGalleryOrUpload(true)}
          aria-label="Edit Gallery"
        >
          <BiEdit />
          <span>עריכת גלריה</span>
        </Button>
      ) : !session ? (
        <CustomerSignIn />
      ) : (
        <CustomerAppointments
          freebusy={freebusy}
          customerAppointments={customerAppointments}
        />
      )}
    </div>
  );
}

export default Responsive;

"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
import Slider from "react-slick";
import { Button } from "@ui/Button";
import { BiEdit } from "react-icons/bi";
import { Image } from "antd";

function Responsive({
  urls,
  setGalleryOrUpload,
}: {
  urls: {
    profileUrls: string;
    backgroundUrls: string;
    galleryImgUrls: string[];
  } | null;
  setGalleryOrUpload: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
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
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
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
    const reorderedImages = urls
      ? [
          ...urls.galleryImgUrls.slice(index),
          ...urls.galleryImgUrls.slice(0, index),
        ]
      : [];
    setPreviewImages(reorderedImages);
    setCurrentImageIndex(0);
    setPreviewVisible(true);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 w-11/12">
      <div className="slider-container w-1/2 max-md:w-10/12">
        {urls?.galleryImgUrls && urls.galleryImgUrls.length > 0 ? (
          <>
            <Slider {...settings} className="flex justify-center items-center">
              {urls.galleryImgUrls.map((img, index) => (
                <div
                  key={index}
                  className="image-container flex justify-center items-center p-2"
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    width="100%"
                    height="200px"
                    src={img}
                    preview={{ visible: false }}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
              ))}
            </Slider>
            <Image.PreviewGroup
              preview={{
                visible: previewVisible,
                onVisibleChange: setPreviewVisible,
              }}
            >
              {previewImages.map((img, index) => (
                <Image key={index} src={img} style={{ display: "none" }} />
              ))}
            </Image.PreviewGroup>
          </>
        ) : (
          <p>No images available</p>
        )}
      </div>
      <Button
        className="flex justify-center items-center gap-2 bg-slate-100 text-black hover:bg-slate-100/50"
        variant="default"
        onClick={() => setGalleryOrUpload(true)}
        aria-label="Edit Gallery"
      >
        <BiEdit />
        <span>עריכת גלריה</span>
      </Button>
    </div>
  );
}

export default Responsive;

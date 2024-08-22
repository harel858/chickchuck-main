"use client";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "./style.scss";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import { LightGallery as ILightGallery } from "lightgallery/lightgallery";
import { InitDetail } from "lightgallery/lg-events";
import { Button } from "@ui/Button";
import { BiEdit } from "react-icons/bi";
import CustomerSignIn from "./CustomerSignIn";
import CustomerAppointments from "./CustomerAppointments";
import { calendar_v3 } from "googleapis";
import { AppointmentRequest, Customer, Treatment, User } from "@prisma/client";
import { Session } from "next-auth";

export const GallerySlider = ({
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
}) => {
  // const lightGalleryRef = useRef<ILightGallery>(null);
  const containerRef = useRef(null);
  const [galleryContainer, setGalleryContainer] = useState("");

  const onInit = useCallback((detail: InitDetail) => {
    if (detail) {
      // lightGalleryRef.current = detail.instance;
      detail.instance.openGallery();
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setGalleryContainer("aaa");
    }
  }, []);
  console.log(containerRef.current);
  return (
    <div className="App">
      {/*       <HeaderComponent />
       */}{" "}
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
      )}{" "}
      <div
        style={{
          height: "800px",
        }}
        ref={containerRef}
      ></div>
      <div>
        <LightGallery
          container={containerRef.current || ""}
          onInit={onInit}
          plugins={[lgZoom, lgThumbnail]}
          closable={false}
          showMaximizeIcon={true}
          slideDelay={400}
          thumbWidth={130}
          thumbHeight={"100px"}
          thumbMargin={6}
          appendSubHtmlTo={".lg-item"}
          dynamic={true}
          dynamicEl={urls?.galleryImgUrls.map((img) => ({
            src: img.url,
            responsive: img.url,
            thumb: img.url,
            /*             subHtml: `<div class="lightGallery-captions">
                        <h4>Photo by <a href="https://unsplash.com/@dann">Dan</a></h4>
                        <p>Published on November 13, 2018</p>
                    </div>`, */
          }))}
          hash={false}
          elementClassNames={"inline-gallery-container"}
        ></LightGallery>
      </div>
    </div>
  );
};

const HeaderComponent: React.FC = () => (
  <div className="header">
    <h1 className="header__title">lightGallery - Inline Gallery</h1>
    <p className="header__description">
      lightGallery is a feature-rich, modular JavaScript gallery plugin for
      building beautiful image and video galleries for the web and the mobile
    </p>
    <p className="header__description2">
      With lightGallery you can create both inline and lightBox galleries. You
      can create inline gallery by passing the container element via container
      option. All the lightBox features are available in inline gallery as well.
      inline gallery can be converted to the lightBox gallery by clicking on the
      maximize icon on the toolbar
    </p>
    <a
      className="header__button"
      href="https://github.com/sachinchoolur/lightGallery"
      target="_blank"
    >
      View on GitHub
    </a>
  </div>
);
export default GallerySlider;

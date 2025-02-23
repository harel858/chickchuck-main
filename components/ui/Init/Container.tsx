"use client";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, message, Steps, theme, UploadFile } from "antd";
import InitActivityDetails, { DayData } from "./InitActivityDetails";
import InitServices, { ServiceInput } from "./InitServices";
import BusinessDetailsForm from "./BusinessDetailsForm";
import type { Session } from "next-auth";
import { TBusinessDetailsValidation } from "@lib/validators/business-details-validation";
import OnlinePage from "./onlinePage/OnlinePage";
import { createBusiness } from "actions/createBusiness";
import axios from "axios";
import { RcFile } from "antd/es/upload";
import { useTranslations } from "next-intl";
import {
  Progress,
  ProgressIndicator,
  Root,
  Indicator,
} from "@radix-ui/react-progress";

const Container = ({
  session,
  locale,
}: {
  session: Session;
  locale: string;
}) => {
  const t = useTranslations("createbusinessdetails");
  const initDays: DayData[] = [
    {
      value: 0,
      label: t("sunday"),
      start: "09:00",
      end: "17:00",
      isActive: true,
    },
    {
      value: 1,
      label: t("monday"),
      start: "09:00",
      end: "17:00",
      isActive: true,
    },
    {
      value: 2,
      label: t("tuesday"),
      start: "09:00",
      end: "17:00",
      isActive: true,
    },
    {
      value: 3,
      label: t("wednesday"),
      start: "09:00",
      end: "17:00",
      isActive: true,
    },
    {
      value: 4,
      label: t("thursday"),
      start: "09:00",
      end: "17:00",
      isActive: true,
    },
    {
      value: 5,
      label: t("friday"),
      start: "09:00",
      end: "17:00",
      isActive: true,
    },
    {
      value: 6,
      label: t("saturday"),
      start: "09:00",
      end: "17:00",
      isActive: true,
    },
  ];
  console.log("session", session);

  const router = useRouter();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(75);

  const [isLoading, setIsLoading] = useState(false);
  const [stepsInitialized, setStepsInitialized] = useState(false);
  const [businessDetails, setBusinessDetails] =
    useState<TBusinessDetailsValidation | null>(null);
  const [activityDays, setActivityDays] = useState<DayData[]>(initDays);
  const [services, setServices] = useState<ServiceInput[]>([]);
  const [gallaryList, setGallaryList] = useState<UploadFile[]>([]);
  const [logo, setLogo] = useState<UploadFile[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(75), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simulate asynchronous initialization
    setTimeout(() => {
      setStepsInitialized(true);
    }, 0);
  }, []);

  const next = useCallback(() => {
    setCurrent(current + 1);
    setProgress(progress - 25);
  }, [current]);

  const prev = () => {
    setCurrent(current - 1);
    setProgress(progress + 25);
  };
  const steps = [
    {
      title: t("AboutTheBusiness"),
      content: (
        <BusinessDetailsForm
          locale={locale}
          next={next}
          setBusinessDetails={setBusinessDetails}
        />
      ),
    },
    {
      title: t("OperatingSchedule"),
      content: (
        <InitActivityDetails
          locale={locale}
          setActivityDays={setActivityDays}
          activityDays={activityDays}
        />
      ),
    },
    {
      title: t("BusinessServices"),
      content: (
        <InitServices
          locale={locale}
          services={services}
          setServices={setServices}
        />
      ),
    },
    {
      title: t("BusinessPage"),
      content: (
        <OnlinePage
          fileList={gallaryList}
          setFileList={setGallaryList}
          setLogo={setLogo}
          logo={logo}
        />
      ),
    },
  ];

  const onDone = async () => {
    setIsLoading(true);
    if (!businessDetails) {
      message.error("there are some missing values");
      return;
    }
    const formData = new FormData();
    formData.append("userId", session.user.id!);
    formData.append("businessDetails", JSON.stringify(businessDetails));
    formData.append("activityDays", JSON.stringify(activityDays));
    formData.append("services", JSON.stringify(services));
    formData.append("gallaryList", JSON.stringify(gallaryList));
    formData.append("logoFile", logo[0]?.originFileObj as File);
    // Append each file in gallaryList individually
    gallaryList.forEach((file, index) => {
      formData.append(`gallaryList[${index}]`, file.originFileObj as File);
    });

    formData.append(`gallaryLength`, JSON.stringify(gallaryList.length));

    try {
      if (!businessDetails) {
        message.error("there are some missing values");
        return;
      }

      const result = await axios.post("/api/business/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (result.status === 200) {
        return router.push(`/${locale}/schedule`);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "2rem 0 2rem 0",
    borderRadius: "10px 10px 10px 10px",
    width: "100%",
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 rounded-xl w-10/12 shadow-lg shadow-black/50 bg-slate-200">
      {/* {stepsInitialized && (
        <Steps
          direction="horizontal"
          current={current}
          items={items}
          responsive
          className="mt-4"
        />
      )} */}
      <Root
        className="relative h-[25px] w-11/12 md:w-[300px] overflow-hidden rounded-full bg-purple-500/50"
        style={{
          // Fix overflow clipping in Safari
          // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
          transform: "translateZ(0)",
        }}
        value={progress}
      >
        <Indicator
          className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] size-full bg-white transition-transform duration-[660ms]"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Root>
      <div
        style={contentStyle}
        className="flex flex-col justify-center items-center text-black bg-slate-200 w-full"
      >
        {steps[current]?.content}
      </div>
      <div className="mt-2 space-x-4">
        {current > 0 && (
          <Button className="hover:bg-white/30" onClick={() => prev()}>
            {t("back")}
          </Button>
        )}
        {current < steps.length - 1 && current != 0 && (
          <Button
            className="bg-slate-950"
            type="primary"
            onClick={() => next()}
          >
            {t("next")}
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            loading={isLoading}
            type="primary"
            className="bg-slate-950"
            onClick={onDone}
          >
            {t("finish")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Container;

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

const initDays: DayData[] = [
  { value: 0, label: "'א", start: "09:00", end: "17:00", isActive: true },
  { value: 1, label: "'ב", start: "09:00", end: "17:00", isActive: true },
  { value: 2, label: "'ג", start: "09:00", end: "17:00", isActive: true },
  { value: 3, label: "'ד", start: "09:00", end: "17:00", isActive: true },
  { value: 4, label: "'ה", start: "09:00", end: "17:00", isActive: true },
  { value: 5, label: "'ו", start: "09:00", end: "17:00", isActive: true },
  { value: 6, label: "'ש", start: "09:00", end: "17:00", isActive: true },
];

const Container = ({ session }: { session: Session }) => {
  const router = useRouter();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [stepsInitialized, setStepsInitialized] = useState(false);
  const [businessDetails, setBusinessDetails] =
    useState<TBusinessDetailsValidation | null>(null);
  const [activityDays, setActivityDays] = useState<DayData[]>(initDays);
  const [services, setServices] = useState<ServiceInput[]>([]);
  const [gallaryList, setGallaryList] = useState<UploadFile[]>([]);
  const [logo, setLogo] = useState<UploadFile[]>([]);

  useEffect(() => {
    // Simulate asynchronous initialization
    setTimeout(() => {
      setStepsInitialized(true);
    }, 0);
  }, []);

  const next = useCallback(() => {
    setCurrent(current + 1);
  }, [current]);

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "קצת על העסק",
      content: (
        <BusinessDetailsForm
          next={next}
          setBusinessDetails={setBusinessDetails}
        />
      ),
    },
    {
      title: "זמני פעילות",
      content: (
        <InitActivityDetails
          setActivityDays={setActivityDays}
          activityDays={activityDays}
        />
      ),
    },
    {
      title: "שירותי העסק",
      content: <InitServices services={services} setServices={setServices} />,
    },
    {
      title: "עמוד עסקי",
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
      console.log("result", result);
      if (result.status === 200) {
        return router.push("/schedule");
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
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    width: "100%",
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 p-4 rounded-xl w-10/12 shadow-lg shadow-black/50 bg-orange-200">
      {stepsInitialized && (
        <Steps
          direction="horizontal"
          current={current}
          items={items}
          responsive
          className="border-b border-gray-500/50"
        />
      )}

      <div
        style={contentStyle}
        className="flex flex-col justify-center items-center text-black bg-orange-200 w-full"
      >
        {steps[current]?.content}
      </div>
      <div className="mt-2 space-x-4">
        {current > 0 && (
          <Button className="hover:bg-white/30" onClick={() => prev()}>
            חזור
          </Button>
        )}
        {current < steps.length - 1 && current != 0 && (
          <Button className="bg-sky-600" type="primary" onClick={() => next()}>
            המשך
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            loading={isLoading}
            type="primary"
            className="bg-sky-600"
            onClick={onDone}
          >
            סיים
          </Button>
        )}
      </div>
    </div>
  );
};

export default Container;

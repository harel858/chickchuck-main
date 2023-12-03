"use client";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { Button, message, Steps, theme } from "antd";
import InitActivityDetails, { DayData } from "./InitActivityDetails";
import InitServices, { ServiceInput } from "./InitServices";
import BusinessDetailsForm from "./BusinessDetailsForm";
import type { Session } from "next-auth";
import { TBusinessDetailsValidation } from "@lib/validators/business-details-validation";
import OnlinePage from "./onlinePage/OnlinePage";
import { createBusiness } from "actions/createBusiness";

const initDays: DayData[] = [
  { value: 0, label: "Su", start: "09:00", end: "17:00", isActive: true },
  { value: 1, label: "Mo", start: "09:00", end: "17:00", isActive: true },
  { value: 2, label: "Tu", start: "09:00", end: "17:00", isActive: true },
  { value: 3, label: "We", start: "09:00", end: "17:00", isActive: true },
  { value: 4, label: "Mo", start: "09:00", end: "17:00", isActive: true },
  { value: 5, label: "Fr", start: "09:00", end: "17:00", isActive: true },
  { value: 6, label: "Sa", start: "09:00", end: "17:00", isActive: true },
];

const Container = ({ session }: { session: Session }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [stepsInitialized, setStepsInitialized] = useState(false);
  const [businessDetails, setBusinessDetails] =
    useState<TBusinessDetailsValidation | null>(null);
  const [activityDays, setActivityDays] = useState<DayData[]>(initDays);
  const [services, setServices] = useState<ServiceInput[]>([]);

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
      title: "First",
      content: (
        <BusinessDetailsForm
          next={next}
          setBusinessDetails={setBusinessDetails}
        />
      ),
    },
    {
      title: "Second",
      content: (
        <InitActivityDetails
          setActivityDays={setActivityDays}
          activityDays={activityDays}
        />
      ),
    },
    {
      title: "third",
      content: <InitServices services={services} setServices={setServices} />,
    },
    {
      title: "Last",
      content: <OnlinePage />,
    },
  ];

  const onDone = async () => {
    console.log("email", session.user.email!);

    try {
      if (!businessDetails) {
        message.error("there are some missing values");
        return setCurrent(0);
      }
      const res = await createBusiness(
        session.user.email!,
        businessDetails,
        activityDays,
        services
      );
      console.log("res", res);
    } catch (err) {
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
            Previous
          </Button>
        )}
        {current < steps.length - 1 && current != 0 && (
          <Button className="bg-sky-600" type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            loading={isPending}
            type="primary"
            className="bg-sky-600"
            onClick={() => startTransition(() => onDone())}
          >
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

export default Container;

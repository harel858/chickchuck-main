"use client";
import React from "react";
import { Tabs, Divider } from "antd";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";

export default function Form() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [requestId, setRequestId] = React.useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const items = [
    {
      label: "Enter Details",
      key: "0",
      disabled: null,
      children: <StepOne handleNext={handleNext} setRequestId={setRequestId} />,
    },
    {
      label: "Create an ad group",
      key: "1",
      disabled: null,
      children: <StepTwo handleNext={handleNext} requestId={requestId} />,
    },
    {
      label: "Create an ad",
      key: "2",
      disabled: null,
      children: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
  ];

  return (
    <>
      <Tabs
        className="w-full flex justify-around bg-gray-900 px-8 pb-8 border-blue-900 border rounded-2xl"
        activeKey={activeStep.toString()}
        size="large"
        tabPosition="top"
        centered
        items={items.map((item, i) => ({
          ...item,
          disabled: activeStep >= i ? false : true,
          label: (
            <div
              className={`text-white ${
                activeStep == i ? `font-md` : `font-light`
              } text-xl`}
            >
              {item.label}
            </div>
          ),
        }))}
      />
    </>
  );
}

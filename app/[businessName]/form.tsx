"use client";

import React, { useMemo, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Button, Checkbox, Divider, Tabs } from "antd";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";

type TabPosition = "left" | "right" | "top" | "bottom";

type PositionType = "left" | "right";

const CheckboxGroup = Checkbox.Group;

const operations = <Button>Extra Action</Button>;

const OperationsSlot: Record<PositionType, React.ReactNode> = {
  left: <Button className="tabs-extra-demo-button">Left Extra Action</Button>,
  right: <Button>Right Extra Action</Button>,
};

export default function Form() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [requestId, setRequestId] = React.useState("");
  const [position, setPosition] = useState<PositionType[]>(["left", "right"]);

  const slot = useMemo(() => {
    if (position.length === 0) return null;

    return position.reduce(
      (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
      {}
    );
  }, [position]);

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
      disabled: false,
      children: <StepOne handleNext={handleNext} setRequestId={setRequestId} />,
    },
    {
      label: "Create an ad group",
      key: "1",
      disabled: false,
      children: <StepTwo handleNext={handleNext} requestId={requestId} />,
    },
    {
      label: "Create an ad",
      key: "2",
      disabled: true,
      children: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
  ];

  const options = ["left", "right"];

  return (
    <div className="mx-auto my-2">
      <Tabs
        tabBarExtraContent={operations}
        activeKey={activeStep.toString()}
        size="large"
        tabPosition="top"
        centered
        items={items}
      />
      <br />
      <br />
      <br />
      <Divider />
    </div>
  );
}

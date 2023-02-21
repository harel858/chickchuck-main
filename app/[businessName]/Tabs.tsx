"use client";
import React, { useState } from "react";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./StepThree";
import Tab from "./Tab";
import { Lobster } from "@next/font/google";

const font = Lobster({
  subsets: ["latin"],
  weight: "400",
});

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [requestId, setRequestId] = React.useState("");

  const handleNext = () => {
    setActiveTab((activeTab) => activeTab + 1);
  };
  const tabs = [
    {
      label: "Tab 1",
      content: <StepOne handleNext={handleNext} setRequestId={setRequestId} />,
    },
    {
      label: "Tab 2",
      content: <StepTwo handleNext={handleNext} requestId={requestId} />,
    },
    {
      label: "Tab 3",
      content: <StepThree />,
    },
  ];
  return (
    <div className="flex flex-col justify-between rounded-2xl h-full w-full">
      <div className="flex justify-between p-2 bg-gray-900 rounded-t-2xl">
        {tabs.map((tab, index) => (
          <button
            disabled={activeTab >= index ? false : true}
            key={tab.label}
            className={`py-4 px-6 ${font.className} ${
              activeTab == index
                ? "font:bold border-b border-white"
                : "font-light opacity-50"
            }  text-xl `}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="h-full rounded-2xl rounded-t-none bg-gray-900 p-2">
        {tabs.map((tab, index) => (
          <Tab active={activeTab === index} key={tab.label}>
            {activeTab === index && tab.content}
          </Tab>
        ))}
      </div>
    </div>
  );
}

export default Tabs;

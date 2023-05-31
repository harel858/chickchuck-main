"use client";
import React, { useState } from "react";
import classes from "./style.module.css";
import dayjs, { Dayjs } from "dayjs";
import StepTwo from "./stepTwo";
import StepThree from "./StepThree";
import Tab from "./Tab";
import Loading from "./loading";
import { AppointmentInput, UserData } from "../../types/types";
const StepOne = React.lazy(() => import("./stepOne"));

function Tabs({ userData }: { userData: UserData[] }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleNext = () => {
    setActiveTab((activeTab) => activeTab + 1);
  };
  const tabs = [
    {
      label: "Tab 3",
      content: <StepThree userData={userData} />,
    },
  ];
  return (
    <div className="flex flex-col justify-between rounded-2xl h-full w-full">
      <div className="flex justify-between p-2 bg-gray-600 rounded-t-2xl">
        {tabs.map((tab, index) => (
          <button
            disabled={activeTab >= index ? false : true}
            key={tab.label}
            className={`py-4 px-6 ${classes.tabLabel} ${
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
      <div className="h-full rounded-2xl rounded-t-none bg-gray-600">
        {tabs.map((tab, index) => (
          <Tab active={activeTab === index} key={tab.label} userData={userData}>
            {activeTab === index && tab.content}
          </Tab>
        ))}
      </div>
    </div>
  );
}

export default Tabs;

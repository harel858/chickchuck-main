"use client";
import React, { useState } from "react";
import StepTwo from "./stepTwo";
import StepThree from "./StepThree";
import Tab from "./Tab";
import { Lobster } from "@next/font/google";
import { AvailableSlot, Treatment, User } from "@prisma/client";
import Loading from "./loading";
import { formData } from "../../types";

const StepOne = React.lazy(() => import("./stepOne"));

const font = Lobster({
  subsets: ["latin"],
  weight: "400",
});

function Tabs({
  user,
}: {
  user: User & {
    Treatment: Treatment[];
    availableSlots: AvailableSlot[];
  };
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [customerData, setCustomerData] = React.useState<formData>({
    name: "",
    request_id: "",
    phoneNumber: "",
    code: "",
  });

  const handleNext = () => {
    setActiveTab((activeTab) => activeTab + 1);
  };
  const tabs = [
    {
      label: "Tab 1",
      content: (
        <React.Suspense fallback={<Loading />}>
          <StepOne
            handleNext={handleNext}
            customerData={customerData}
            setCustomerData={setCustomerData}
          />
        </React.Suspense>
      ),
    },
    {
      label: "Tab 2",
      content: (
        <StepTwo
          handleNext={handleNext}
          customerData={customerData}
          setCustomerData={setCustomerData}
        />
      ),
    },
    {
      label: "Tab 3",
      content: <StepThree user={user} />,
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
      <div className="h-full rounded-2xl rounded-t-none bg-gray-900 pb-12">
        {tabs.map((tab, index) => (
          <Tab active={activeTab === index} key={tab.label} user={user}>
            {activeTab === index && tab.content}
          </Tab>
        ))}
      </div>
    </div>
  );
}

export default Tabs;

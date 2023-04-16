"use client";
import React, { useState } from "react";
import classes from "./style.module.css";
import dayjs, { Dayjs } from "dayjs";
import StepTwo from "./stepTwo";
import StepThree from "./StepThree";
import Tab from "./Tab";
import Loading from "./loading";
import { AppointmentInput, formData, UserData } from "../../types/types";

const StepOne = React.lazy(() => import("./stepOne"));

function Tabs({ userData }: { userData: UserData }) {
  const [activeTab, setActiveTab] = useState(0);
  const [customerInput, setCustomerInput] = React.useState<formData>({
    name: "",
    request_id: "",
    phoneNumber: "",
    code: "",
  });
  const [appointmentInput, setAppointmentInput] =
    React.useState<AppointmentInput>({
      treatment: null,
      customer: null,
      availableSlot: [],
      userData,
      date: dayjs(),
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
            customerInput={customerInput}
            setCustomerInput={setCustomerInput}
          />
        </React.Suspense>
      ),
    },
    {
      label: "Tab 2",
      content: (
        <StepTwo
          handleNext={handleNext}
          customerInput={customerInput}
          appointmentInput={appointmentInput}
          setAppointmentInput={setAppointmentInput}
          setCustomerInput={setCustomerInput}
        />
      ),
    },
    {
      label: "Tab 3",
      content: (
        <StepThree
          appointmentInput={appointmentInput}
          setAppointmentInput={setAppointmentInput}
          userData={userData}
        />
      ),
    },
  ];
  return (
    <div className="flex flex-col justify-between rounded-2xl h-full w-full">
      <div className="flex justify-between p-2 bg-gray-900 rounded-t-2xl">
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
      <div className="h-full rounded-2xl rounded-t-none bg-gray-900 pb-12">
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

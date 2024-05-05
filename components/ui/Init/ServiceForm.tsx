"use client";
import React, { ChangeEvent } from "react";
import ServiceFormField from "./ServiceFormField";
import { ServiceInput } from "./InitServices";

export interface ServiceFieldType {
  label: "כותרת" | "מחיר" | "משך זמן הטיפול";
  name: "title" | "price" | "duration";
  value: string | number | undefined;
}

const BusinessDetailsForm = ({
  handleServicesChange,
  service,
}: {
  handleServicesChange: (e: ChangeEvent<HTMLInputElement>) => void;
  service: ServiceInput;
}) => {
  console.log("service", service);

  ["Title", "Price", "Time Durtion"];
  const formType: ServiceFieldType[] = [
    { label: "כותרת", name: "title", value: service.title },
    { label: "מחיר", name: "price", value: service.price },
    { label: "משך זמן הטיפול", name: "duration", value: service.duration },
  ];
  return (
    <div className="flex flex-col justify-center items-center bg-orange-200 rounded-3xl py-4">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center gap-x-4 gap-y-4 w-full">
          {formType.map((item, i) => {
            return (
              <ServiceFormField
                handleServicesChange={handleServicesChange}
                name={item.name}
                label={item.label}
                value={item.value}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;

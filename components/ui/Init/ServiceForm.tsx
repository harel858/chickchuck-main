"use client";
import React, { ChangeEvent } from "react";
import ServiceFormField from "./ServiceFormField";
import { ServiceInput } from "./InitServices";
import { useTranslations } from "next-intl";

export interface ServiceFieldType {
  label: string;
  name: "title" | "price" | "duration";
  value: string | number;
}

const BusinessDetailsForm = ({
  handleServicesChange,
  service,
  locale,
}: {
  handleServicesChange: (e: ChangeEvent<HTMLInputElement>) => void;
  service: ServiceInput;
  locale: string;
}) => {
  const t = useTranslations("serviceForm");

  const formType: ServiceFieldType[] = [
    { label: t("serviceName"), name: "title", value: service.title },
    { label: t("servicePrice"), name: "price", value: service.price },
    { label: t("serviceDuration"), name: "duration", value: service.duration },
  ];

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 rounded-xl py-6 px-8 mt-5 shadow-lg">
      <h1 className="text-3xl font-sans font-medium text-black mb-4">
        {t("header")}
      </h1>
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

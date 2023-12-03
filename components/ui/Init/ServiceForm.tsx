"use client";
import React, { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import {
  TreatmentType,
  TreatmentValidation,
} from "@lib/validators/treatmentValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import { Form } from "@ui/form";
import { Button } from "antd";
import { Treatment } from "@prisma/client";
import ServiceFormField from "./ServiceFormField";
import { ServiceInput } from "./InitServices";

export interface ServiceFieldType {
  label: "Title" | "Price" | "Time Durtion";
  name: "title" | "price" | "duration";
  value: string | number;
}

const BusinessDetailsForm = ({
  handleServicesChange,
  service,
}: {
  handleServicesChange: (e: ChangeEvent<HTMLInputElement>) => void;
  service: ServiceInput;
}) => {
  ["Title", "Price", "Time Durtion"];
  const formType: ServiceFieldType[] = [
    { label: "Title", name: "title", value: service.title },
    { label: "Price", name: "price", value: service.price },
    { label: "Time Durtion", name: "duration", value: service.duration },
  ];
  return (
    <div className="flex flex-col justify-center items-center bg-orange-200 rounded-3xl py-4">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center gap-x-4 gap-y-4 w-full">
          {formType.map((item) => {
            return (
              <ServiceFormField
                handleServicesChange={handleServicesChange}
                name={item.name}
                label={item.label}
                value={item.value}
                key={item.label}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;

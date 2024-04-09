"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  BusinessDetailsValidation,
  TBusinessDetailsValidation,
} from "@lib/validators/business-details-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import { Form } from "@ui/form";
import { Button } from "@ui/Button";

export interface FieldType {
  label:
    | "Your Business Name"
    | "Your Business Phone"
    | "Your Business Address"
    | "Business Type"
    | "What calendar have you used so far?"
    | "lastCalendar"
    | "How did you hear about us?";
  name:
    | "businessName"
    | "businessPhone"
    | "businessAddress"
    | "businessType"
    | "lastCalendar"
    | "fromWhere";
}

const MemberForm = () => {
  const form = useForm<TBusinessDetailsValidation>({
    resolver: zodResolver(BusinessDetailsValidation),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const onSubmit = async (data: TBusinessDetailsValidation) => {
    try {
    } catch (err: any) {
      console.log(typeof err);
      console.log("err", err);
    }
  };
  const formType: FieldType[] = [
    { label: "Your Business Name", name: "businessName" },
    { label: "Your Business Phone", name: "businessPhone" },
    { label: "Your Business Address", name: "businessAddress" },
    { label: "Business Type", name: "businessType" },
    {
      label: "What calendar have you used so far?",
      name: "lastCalendar",
    },
    { label: "How did you hear about us?", name: "fromWhere" },
  ];

  return (
    <>
      <h1 className="text-2xl text-black">Lets Set Up Your Calendar </h1>
      <div className="flex flex-col justify-center items-center w-full">
        <Form {...form}>
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-2 max-xl:grid-cols-1 gap-x-4 gap-y-4 w-full">
              {formType.map(({ label, name }) => {
                return (
                  <FormField
                    errors={errors}
                    register={register}
                    control={control}
                    name={name}
                    label={label}
                    key={label}
                  />
                );
              })}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default MemberForm;

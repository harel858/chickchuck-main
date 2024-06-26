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
  label: "שם העסק" | "טלפון" | "כתובת העסק";
  name: "businessName" | "businessPhone" | "businessAddress";
}

const BusinessDetailsForm = ({
  next,
  setBusinessDetails,
}: {
  next: () => void;
  setBusinessDetails: React.Dispatch<
    React.SetStateAction<TBusinessDetailsValidation | null>
  >;
}) => {
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
      setBusinessDetails(data);
      next();
    } catch (err: any) {
      console.log(typeof err);
      console.log("err", err);
    }
  };
  const formType: FieldType[] = [
    { label: "שם העסק", name: "businessName" },
    { label: "טלפון", name: "businessPhone" },
    { label: "כתובת העסק", name: "businessAddress" },
  ];

  return (
    <>
      <h1 className="text-2xl text-black">קצת על העסק שלך</h1>
      <div className="flex flex-col justify-center items-center w-full">
        <Form {...form}>
          <form
            className="flex flex-col justify-center items-center gap-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col justify-center items-center gap-x-4 gap-y-4 w-full">
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
            <Button className="bg-sky-600 w-full" type="submit" size="lg">
              המשך
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default BusinessDetailsForm;

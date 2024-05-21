"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  BusinessDetailsValidation,
  TBusinessDetailsValidation,
} from "@lib/validators/business-details-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import { Form } from "@ui/form";
import { Button } from "@ui/Button";
import updateBusinessDetails from "actions/updateBusinessDetails";
import { message } from "antd";
import { Business } from "@prisma/client";

export interface FieldType {
  label: "שם העסק" | "טלפון" | "כתובת" | "אישור תורים";
  name:
    | "businessName"
    | "businessPhone"
    | "businessAddress"
    | "confirmationNeeded";
}

const BusinessDetailsForm = ({ business }: { business: Business }) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<TBusinessDetailsValidation>({
    resolver: zodResolver(BusinessDetailsValidation),
    defaultValues: {
      businessAddress: business.Address,
      businessPhone: business.phone,
      businessName: business.businessName,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = form;

  const onSubmit = async (data: TBusinessDetailsValidation) => {
    try {
      startTransition(async () => updateBusinessDetails(data, business.id));
      message.success("פרטי העסק עודכנו בהצלחה");
    } catch (err: any) {
      console.log("err", err);
      message.error("שגיאה בעת עדכון פרטי העסק, פנה לתמיכה");
    }
  };
  const formType: FieldType[] = [
    { label: "שם העסק", name: "businessName" },
    { label: "טלפון", name: "businessPhone" },
    { label: "כתובת", name: "businessAddress" },
    { label: "אישור תורים", name: "confirmationNeeded" },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-2xl text-black w-full text-center">פרטי העסק </h1>
      <div className="flex flex-col justify-center items-center w-full">
        <Form {...form}>
          <form
            className="flex flex-col justify-center items-center gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col justify-center items-center gap-5 w-full">
              {formType.map(({ label, name }) => {
                return (
                  <FormField
                    control={control}
                    errors={errors}
                    register={register}
                    name={name}
                    label={label}
                    key={label}
                    getValues={getValues}
                  />
                );
              })}
            </div>
            <Button
              isLoading={isPending}
              className="bg-sky-600"
              type="submit"
              size="lg"
            >
              שמור
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;

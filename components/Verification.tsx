"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TUserValidation,
  UserValidation,
} from "@lib/validators/userValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@ui/form";
import { Button } from "@ui/Button";
import FormField from "./FormField";
import dayjs from "dayjs";
import { Treatment, User } from "@prisma/client";
import { calendar_v3 } from "googleapis";
import axios from "axios";

export interface FieldType {
  label: "שם מלא" | "מספר פלאפון";
  name: "fullName" | "phoneNumber";
}

const BusinessDetailsForm = ({
  selectedService,
  selectedSlot,
  onSetCustomerInput,
  selectedUser,
}: {
  selectedUser: User;
  selectedService: Treatment | null;
  selectedSlot: calendar_v3.Schema$TimePeriod | null;

  onSetCustomerInput: (
    input: {
      fullName: string;
      phoneNumber: string;
    } & {
      request_id: string;
    }
  ) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    return () => setIsLoading(false);
  }, []);
  const form = useForm<TUserValidation>({
    resolver: zodResolver(UserValidation),
  });
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
    control,
  } = form;
  // Watch the values of fullName and phoneNumber
  const fullName = watch("fullName");
  const phoneNumber = watch("phoneNumber");

  const onSubmit = async (data: TUserValidation) => {
    try {
      setIsLoading(true);
      const result = await axios.post("/api/verification/sendotp", {
        name: data.fullName,
        phoneNumber: data.phoneNumber,
      });
      const request_id = result.data.request_id;

      onSetCustomerInput({ ...data, request_id: request_id });
    } catch (err: any) {
      console.log(typeof err);
      console.log("err", err);
      setIsLoading(false);
    }
  };
  const formType: FieldType[] = [
    { label: "שם מלא", name: "fullName" },
    { label: "מספר פלאפון", name: "phoneNumber" },
  ];

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <h1 className="text-2xl text-black">סיכום</h1>
      <p className="text-xl text-black text-center">
        תור אצל {selectedUser.name} ל{selectedService?.title} בתאריך{" "}
        {dayjs(selectedSlot?.start).format("DD/MM/YYYY")} בשעה{" "}
        {dayjs(selectedSlot?.start).format("HH:mm")}
      </p>
      <div className="flex flex-col justify-center items-center w-full">
        <Form {...form}>
          <form
            className="flex flex-col justify-center items-center gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col justify-center items-center gap-2">
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
            <Button
              className="bg-blue-600 text-2xl  w-1/3 max-md:w-full transition-all ease-in-out duration-300"
              type="submit"
              size="lg"
              isLoading={isLoading}
              disabled={!fullName || !phoneNumber}
            >
              המשך
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;

"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  TUserValidationCode,
  UserValidationCode,
} from "@lib/validators/userValidationCode";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@ui/form";
import { Button } from "@ui/Button";
import dayjs from "dayjs";
import { Customer, Treatment, User } from "@prisma/client";
import { calendar_v3 } from "googleapis";
import axios from "axios";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@lib/utils";
import { createAppointment } from "actions/createAppointment";
import { message } from "antd";
import { createAppointment2 } from "actions/createApointment2";
import { VerificationData } from "types/types";

const BusinessDetailsForm = ({
  selectedService,
  selectedSlot,
  customerInput,
  freeBusy,
  handleNext,
  bussinesId,
  selectedUser,
}: {
  selectedService: Treatment | null;
  selectedSlot: calendar_v3.Schema$TimePeriod | null;
  customerInput:
    | ({
        fullName: string;
        phoneNumber: string;
      } & {
        request_id: string;
      })
    | null;
  freeBusy: string;
  handleNext: () => void;
  bussinesId: string;
  selectedUser: User;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TUserValidationCode>({
    resolver: zodResolver(UserValidationCode),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const onSubmit = async (data: TUserValidationCode) => {
    try {
      const params = {
        code: data.code,
        request_id: customerInput?.request_id,
        name: customerInput?.fullName,
        phoneNumber: customerInput?.phoneNumber,
        bussinesId: bussinesId,
      } as VerificationData;
      const result = await axios.post("/api/verification/steptwo", params);
      const client = result.data as Customer;
      if (result.status === 200) {
        const eventProps = {
          summary: client.name,
          description: "",
          start: {
            dateTime: selectedSlot?.start || "", // Date.toISOString() ->
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
          },
          end: {
            dateTime: selectedSlot?.end || "", // Date.toISOString() ->
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
          },
          extendedProperties: {
            private: {
              treatmentId: selectedService?.id || "",
              customerId: client.id || "",
              customerName: client.name || "",
              conferenceId: selectedUser.calendarId || "primary",
            },
          },
        };
        const event = await createAppointment2(freeBusy, eventProps);
        if (event) {
          handleNext();
          return message.success("הפגישה נקבעה בהצלחה");
        }
      }
    } catch (err: any) {
      console.log(typeof err);
      console.log("err", err);
      return message.error("קביעת פגישה נכשלה");
    }
  };

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
              <div
                key={"code"}
                className="flex flex-col justify-center items-center gap-2"
              >
                <Label htmlFor={"code"}>{"הכנס קוד"}</Label>
                <Input
                  style={{ width: "15rem" }} // Set the specific width here
                  {...register("code")}
                  className={cn({
                    "focus-visible:ring-red-500": errors["code"],
                  })}
                  placeholder={"הכנס קוד"}
                  maxLength={10}
                />
                {errors?.["code"] && (
                  <p className="text-sm text-red-500">
                    {errors["code"]?.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              className="bg-blue-600 text-2xl fixed bottom-5 w-1/3 max-md:w-full transition-all ease-in-out duration-300"
              type="submit"
              size="lg"
              isLoading={isPending}
            >
              סיום
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;

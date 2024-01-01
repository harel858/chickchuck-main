"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  TAppointmentValidation,
  appointmentValidation,
} from "@lib/validators/AppointmentValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import AppointmentField, { FieldType } from "./FormField";
import { Form } from "@ui/form";
import { Button } from "@ui/Button";
import { Session } from "next-auth";
import dayjs from "dayjs";

const Appointment = ({ session }: { session: Session }) => {
  const form = useForm<TAppointmentValidation>({
    resolver: zodResolver(appointmentValidation),
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    control,
  } = form;

  const onSubmit = async (data: TAppointmentValidation) => {
    try {
      console.log("session.user.access_token", session.user.access_token);

      const res = await fetch(
        "https://www.googleapis.com/calendar/v3/freeBusy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.user.access_token,
          },

          body: JSON.stringify({
            timeMin: dayjs().toISOString(),
            timeMax: dayjs().toISOString(), // Assuming dayjs() is the correct format
            timeZone: "string",
            groupExpansionMax: 1,
            calendarExpansionMax: 50,
            items: [
              {
                id: "primary",
              },
            ],
          }),
        }
      );
    } catch (err: any) {
      console.log(typeof err);
      console.log("err", err);
    }
  };
  const formType: FieldType[] = [
    { label: "For who?", name: "Client" },
    { label: "Pick A Service", name: "Service" },
    { label: "When Do You Want", name: "Date" },
  ];
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl text-black">Lets Set Up Your Calendar </h1>
      <div className="flex flex-col justify-center items-center w-full">
        <Form {...form}>
          <form
            className="flex flex-col items-center gap-4 mt-4 w-full relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            {formType.map(({ label, name }) => {
              return (
                <AppointmentField
                  errors={errors}
                  register={register}
                  control={control}
                  name={name}
                  label={label}
                  key={label}
                  getValues={getValues}
                  session={session}
                />
              );
            })}
            <Button
              onSubmit={handleSubmit(onSubmit)}
              className="bg-sky-600 w-full"
              type="submit"
              size="lg"
            >
              Add
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Appointment;

"use client";
import React, { useTransition } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import { Form } from "@ui/form";
import { Button } from "@ui/Button";
import {
  MemberValidation,
  TMemberValidation,
} from "@lib/validators/memberDetails";
import { User } from "@prisma/client";
import addMember from "actions/addTeamMember";
import { Session } from "next-auth";
import { message } from "antd";

export interface FieldType {
  label:
    | "שם"
    | "מספר נייד"
    | "הרשאות"
    | "להסתיר את העמודה מהיומן"
    | "להסתיר מקביעת תורים על ידי לקוחות";
  name: "name" | "phone" | "calendarHide" | "pageHide" | "authorization";
}

const MemberForm = ({
  users,
  businessId,
  session,
  handleCancel,
  access_token,
}: {
  access_token: string;
  businessId: string;
  users: User[];
  session: Session;
  handleCancel: () => void;
}) => {
  const [isPanding, setIsPending] = useTransition();
  const form = useForm<TMemberValidation>({
    resolver: zodResolver(MemberValidation),
    defaultValues: { calendarHide: false, pageHide: false },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;
  const data = form.getValues();
  const onSubmit = async (data: TMemberValidation) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // America/Los_Angeles
    try {
      setIsPending(async () => {
        await addMember(
          access_token,
          data,
          businessId,
          session.user.accountId,
          timeZone
        );
      });
      message.success(`${data.name} נוסף לצוות`);
    } catch (err) {
      // Reset service state to initial state
      console.log(err);
    }
  };
  const formType: FieldType[] = [
    { label: "שם", name: "name" },
    { label: "מספר נייד", name: "phone" },
    { label: "הרשאות", name: "authorization" },
    { label: "להסתיר את העמודה מהיומן", name: "calendarHide" },
    {
      label: "להסתיר מקביעת תורים על ידי לקוחות",
      name: "calendarHide",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center bg-slate-200 py-5 w-full">
      <Form {...form}>
        <form
          className="flex flex-col justify-center items-center w-full gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col justify-center items-center gap-4 w-full">
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
          <Button isLoading={isPanding} type="submit">
            שמירה
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MemberForm;

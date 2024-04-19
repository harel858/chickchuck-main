"use client";
import React, { useTransition } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import { Form } from "@ui/form";
import { Button } from "@ui/Button";
import { MemberSignin, TMemberSignin } from "@lib/validators/memberSignin";
import { User } from "@prisma/client";
import addMember from "actions/addTeamMember";
import { Session } from "next-auth";
import { message } from "antd";

export interface FieldType {
  label: "מספר נייד" | "סיסמה" | "אימות סיסמה";
  name: "phone" | "password" | "confirmPassword";
}

const MemberForm = () => {
  const [isPanding, setIsPending] = useTransition();
  const form = useForm<TMemberSignin>({
    resolver: zodResolver(MemberSignin),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;
  const data = form.getValues();
  const onSubmit = async (data: TMemberSignin) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // America/Los_Angeles
    try {
    } catch (err) {
      // Reset service state to initial state
      console.log(err);
    }
  };
  const formType: FieldType[] = [
    { label: "מספר נייד", name: "phone" },
    { label: "סיסמה", name: "password" },
    { label: "אימות סיסמה", name: "confirmPassword" },
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

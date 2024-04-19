import { useState } from "react";
import { Input } from "@components/input";
import { Label } from "@components/label";
import { cn } from "@lib/utils";
import { Select } from "antd";
import { Switch } from "@ui/switch";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { TMemberValidation } from "@lib/validators/memberDetails";

const authorizationOptions = [
  { label: "ללא הרשאות", value: "NONE" },
  { label: "גישה ליומן בלבד", value: "CALENDAR" },
  { label: "מנהל", value: "ADMIN" },
];

const FormFields = ({
  label,
  name,
  register,
  errors,
  control,
}: {
  label: string;
  control: Control<TMemberValidation>;
  name: string;
  register: UseFormRegister<TMemberValidation>;
  errors: FieldErrors<TMemberValidation>;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {name === "authorization" ? (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem style={{ width: "15rem" }}>
              <Label htmlFor={name}>{label}</Label>
              <Select
                style={{ width: "100%" }}
                onChange={field.onChange}
                defaultValue={field.value}
                options={authorizationOptions}
              />
              {errors?.[name] && (
                <p className="text-sm text-red-500">{errors[name]?.message}</p>
              )}
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <>
          {name === "name" || name === "phone" ? (
            <FormField
              control={control}
              name={name}
              render={({ field }) => (
                <FormItem style={{ width: "15rem" }}>
                  <Label htmlFor={name}>{label}</Label>
                  <Input
                    style={{ width: "100%" }}
                    onChange={field.onChange}
                    defaultValue={field.value}
                  />
                  {errors?.[name] && (
                    <p className="text-sm text-red-500">
                      {errors[name]?.message}
                    </p>
                  )}
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : name === "calendarHide" || name === "pageHide" ? (
            <FormField
              control={control}
              name={name}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between gap-2 rounded-lg border border-gray-500/50 p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>{label}</FormLabel>
                  </div>
                  <Switch className="bg-black" onChange={field.onChange} />
                </FormItem>
              )}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default FormFields;

"use client";
import { Input } from "@components/input";
import { Label } from "@components/label";
import { cn } from "@lib/utils";
import { TBusinessDetailsValidation } from "@lib/validators/business-details-validation";

import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import { FieldType } from "./BusinessDetailsForm";
import { Switch } from "@ui/switch";
import { FormControl, FormField, FormItem, FormLabel } from "@ui/form";

const FormFields = ({
  label,
  name,
  register,
  errors,
  getValues,
  control,
}: {
  control: Control<
    {
      businessName: string;
      businessPhone: string;
      businessAddress: string;
      confirmationNeeded: boolean;
    },
    any
  >;
  label: FieldType["label"];
  name: FieldType["name"];
  register: UseFormRegister<TBusinessDetailsValidation>;
  errors: FieldErrors<TBusinessDetailsValidation>;
  getValues?: UseFormGetValues<TBusinessDetailsValidation>;
}) => {
  const data = getValues && getValues();
  return (
    <div
      key={name}
      className={`flex ${
        name === "confirmationNeeded" ? "flex-row" : "flex-col"
      } justify-center items-center gap-2`}
    >
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-col items-center justify-between rounded-lg p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>{label}</FormLabel>
            </div>
            <FormControl>
              {name === "confirmationNeeded" ? (
                <Switch
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
              ) : (
                <Input
                  style={{ width: "15rem" }} // Set the specific width here
                  {...register(name)}
                  className={cn({
                    "focus-visible:ring-red-500": errors[name],
                  })}
                  placeholder={label}
                  defaultValue={getValues && getValues(name)}
                  maxLength={name === "businessPhone" ? 15 : undefined}
                />
              )}
            </FormControl>
          </FormItem>
        )}
      />
      {/*  <Label htmlFor={name}>{label}</Label>
      {name === "confirmationNeeded" ? (
        <Switch onCheckedChange={(e) => c} />
      ) : (
        <Input
          style={{ width: "15rem" }} // Set the specific width here
          {...register(name)}
          className={cn({
            "focus-visible:ring-red-500": errors[name],
          })}
          placeholder={label}
          defaultValue={getValues && getValues(name)}
          maxLength={name === "businessPhone" ? 15 : undefined}
        />
      )} */}
      {errors?.[name] && (
        <p className="text-sm text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FormFields;

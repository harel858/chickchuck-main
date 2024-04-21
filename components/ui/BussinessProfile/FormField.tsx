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

const FormFields = ({
  label,
  name,
  register,
  errors,
  getValues,
}: {
  label: FieldType["label"];
  name: FieldType["name"];
  register: UseFormRegister<TBusinessDetailsValidation>;
  errors: FieldErrors<TBusinessDetailsValidation>;
  getValues?: UseFormGetValues<TBusinessDetailsValidation>;
}) => {
  return (
    <div key={name} className="flex flex-col justify-center items-center gap-2">
      <Label htmlFor={name}>{label}</Label>
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
      {errors?.[name] && (
        <p className="text-sm text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FormFields;

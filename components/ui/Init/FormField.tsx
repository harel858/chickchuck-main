"use client";
import { Input } from "@components/input";
import { Label } from "@components/label";
import { cn } from "@lib/utils";
import { TBusinessDetailsValidation } from "@lib/validators/business-details-validation";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FieldType } from "./BusinessDetailsForm";

const FormFields = ({
  label,
  name,
  register,
  errors,
  control,
}: {
  label: FieldType["label"];
  control: Control<TBusinessDetailsValidation>;
  name: FieldType["name"];
  register: UseFormRegister<TBusinessDetailsValidation>;
  errors: FieldErrors<TBusinessDetailsValidation>;
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
      />
      {errors?.[name] && (
        <p className="text-sm text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FormFields;

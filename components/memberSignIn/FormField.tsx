"use client";
import { Input } from "@components/input";
import { Label } from "@components/label";
import { cn } from "@lib/utils";
import { TMemberSignin } from "@lib/validators/memberSignin";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FieldType } from "./SignInMember";

const FormFields = ({
  label,
  name,
  register,
  errors,
  control,
}: {
  label: FieldType["label"];
  control: Control<TMemberSignin>;
  name: FieldType["name"];
  register: UseFormRegister<TMemberSignin>;
  errors: FieldErrors<TMemberSignin>;
}) => {
  return (
    <div
      key={name}
      className="flex flex-col justify-center items-center gap-2 pt-5"
    >
      <Label htmlFor={name}>{label}</Label>
      <Input
        style={{ width: "15rem" }} // Set the specific width here
        {...register(name)}
        className={cn({
          "focus-visible:ring-red-500": errors[name],
        })}
        placeholder={label}
        maxLength={name === "phone" ? 15 : undefined}
      />
      {errors?.[name] && (
        <p className="text-sm text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FormFields;

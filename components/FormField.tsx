"use client";
import { Input } from "@components/input";
import { Label } from "@components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/select";

import { cn } from "@lib/utils";
import { TUserValidation } from "@lib/validators/userValidation";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FieldType } from "./Verification";

const FormFields = ({
  label,
  name,
  register,
  errors,
  control,
}: {
  label: FieldType["label"];
  control: Control<TUserValidation>;
  name: FieldType["name"];
  register: UseFormRegister<TUserValidation>;
  errors: FieldErrors<TUserValidation>;
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
        maxLength={name === "phoneNumber" ? 15 : undefined}
      />
      {errors?.[name] && (
        <p className="text-sm text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FormFields;

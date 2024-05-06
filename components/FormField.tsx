"use client";
import { Input } from "@components/input";
import { Label } from "@components/label";
import { cn } from "@lib/utils";
import { TUserValidation } from "@lib/validators/userValidation";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFormContext,
} from "react-hook-form";
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
  const { setValue } = useFormContext(); // Accessing useFormContext to get the setValue function

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (!newValue.startsWith("972 ")) {
      // If the new value doesn't start with "+972 ", reset to "+972 "
      /* newValue = "+972 " + newValue; */
      setValue(name, "972 "); // Update the value using setValue
    }
  };

  return (
    <div key={name} className="flex flex-col justify-center items-center gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        style={{ width: "15rem" }} // Set the specific width here
        {...register(name)}
        className={cn({
          "focus-visible:ring-red-500": errors[name],
        })}
        onChange={(props) =>
          name === "phoneNumber" ? handlePhoneNumberChange(props) : undefined
        }
        placeholder={label}
        maxLength={name === "phoneNumber" ? 15 : undefined}
        defaultValue={name === "phoneNumber" ? "972 " : undefined}
      />
      {errors?.[name] && (
        <p className="text-sm text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FormFields;

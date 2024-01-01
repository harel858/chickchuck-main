"use client";
import { Session } from "next-auth";
import { Input } from "@components/input";
import { Label } from "@components/label";
import { cn } from "@lib/utils";
import { TAppointmentValidation } from "@lib/validators/AppointmentValidation";
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import SelectField from "./appointments/SelectField";
import DateField from "./appointments/DateField";

export interface FieldType {
  label: "For who?" | "Pick A Service" | "When Do You Want";
  name: "Service" | "Date" | "Client" | "slot";
}

const AppointmentField = ({
  label,
  name,
  register,
  errors,
  control,
  session,
  getValues,
}: {
  label: FieldType["label"];
  control: Control<TAppointmentValidation>;
  name: FieldType["name"];
  register: UseFormRegister<TAppointmentValidation>;
  errors: FieldErrors<TAppointmentValidation>;
  session: Session;
  getValues: UseFormGetValues<TAppointmentValidation>;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full">
      <Label key={label} className="text-black">
        {label}
      </Label>
      {name === "Service" || name === "Client" ? (
        <SelectField
          control={control}
          errors={errors}
          label={label}
          name={name}
          register={register}
          session={session}
        />
      ) : (
        <DateField
          control={control}
          errors={errors}
          getValues={getValues}
          label={label}
          name={name}
          register={register}
          session={session}
        />
      )}
    </div>
  );
};

export default AppointmentField;

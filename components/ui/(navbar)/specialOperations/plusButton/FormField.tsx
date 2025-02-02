"use client";
import { Session } from "next-auth";
import { Input } from "@components/input";
import { Label } from "@components/label";
import AddCustomer from "./Customer";

import { TAppointmentValidation } from "@lib/validators/AppointmentValidation";
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import SelectField from "./appointments/SelectField";
import DateField from "./appointments/DateField";
import {
  Account,
  ActivityDays,
  Business,
  Customer,
  Treatment,
  User,
} from "@prisma/client";

export interface FieldType {
  label: string;
  name: "Service" | "Date" | "Client" | "slot";
}

const AppointmentField = ({
  label,
  name,
  register,
  errors,
  control,
  session,
  user,
  getValues,
  business,
  selectedUser,
  access_token,
}: {
  label: FieldType["label"];
  control: Control<TAppointmentValidation>;
  name: FieldType["name"];
  register: UseFormRegister<TAppointmentValidation>;
  errors: FieldErrors<TAppointmentValidation>;
  session: Session;
  getValues: UseFormGetValues<TAppointmentValidation>;
  user: User & {
    accounts: Account[];
    Treatment: Treatment[];
    activityDays: ActivityDays[];
    Customer: Customer[];
  };
  business: Business & {
    Customer: Customer[];
  };
  access_token: string;
  selectedUser: User | null;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full">
      <Label key={label} className="text-black">
        {label}
      </Label>
      {name === "Service" || name === "Client" ? (
        <SelectField
          business={business}
          control={control}
          errors={errors}
          label={label}
          name={name}
          register={register}
          session={session}
          user={user}
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
          user={user}
          selectedUser={selectedUser}
          access_token={access_token}
        />
      )}
    </div>
  );
};

export default AppointmentField;

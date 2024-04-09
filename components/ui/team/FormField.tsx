"use client";
import { Input } from "@components/input";
import { Label } from "@components/label";
/* import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/select"; */

import { cn } from "@lib/utils";
import { TBusinessDetailsValidation } from "@lib/validators/business-details-validation";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Select } from "antd";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FieldType } from "./MemberForm";

const businessTypeOptions: {
  label: string;
  value: TBusinessDetailsValidation["businessType"];
}[] = [
  { label: "Barber", value: "Barber" },
  { label: "Beautician", value: "Beautician" },
  { label: "Manicurist", value: "Manicurist" },
  { label: "Beauty Salon", value: "BeautySalon" },
  { label: "Dog Groomer", value: "DogGroomer" },
  { label: "Medical Clinic", value: "MedicalClinic" },
  { label: "Veterinary Clinic", value: "VeterinaryClinic" },
  { label: "Spa And Wellness Center", value: "SpaAndWellnessCenter" },
  { label: "Trainer", value: "Trainer" },
  { label: "Tattoo", value: "TATTOO" },
  { label: "Other", value: "Other" },
];

const lastCalendarOptions: {
  label: string;
  value: TBusinessDetailsValidation["lastCalendar"];
}[] = [
  { label: "Google Calendar", value: "GoogleCalendar" },
  { label: "Other System", value: "OtherSystem" },
  { label: "Physical Calendar", value: "PhysicalCalendar" },
  { label: "None", value: "NONE" },
];
const fromWhereOptions: {
  label: string;
  value: TBusinessDetailsValidation["fromWhere"];
}[] = [
  { label: "Google Search", value: "GoogleSearch" },
  { label: "Internet Advertisement", value: "InternetAdvertisement" },
  { label: "Recommendation", value: "Recommendation" },
  { label: "I saw it in another business", value: "anotherBusiness" },
];

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
  const selectOptions: {
    label: string;
    value: string;
  }[] =
    name === "businessType"
      ? businessTypeOptions
      : name === "lastCalendar"
      ? lastCalendarOptions
      : fromWhereOptions;

  return (
    <div key={name} className="flex flex-col justify-center items-center gap-2">
      <Label htmlFor={name}>{label}</Label>
      {name === "businessType" ||
      name === "lastCalendar" ||
      name === "fromWhere" ? (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <>
              <FormItem
                style={{ width: "15rem" }} // Set the specific width here
              >
                <Select
                  style={{ width: "15rem" }} // Set the specific width here
                  onChange={field.onChange}
                  defaultValue={field.value}
                  options={selectOptions}
                />

                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default FormFields;

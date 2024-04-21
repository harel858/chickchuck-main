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
import { TBusinessDetailsValidation } from "@lib/validators/business-details-validation";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FieldType } from "./BusinessDetailsForm";

const businessTypeOptions: {
  name: string;
  value: TBusinessDetailsValidation["businessType"];
}[] = [
  { name: "Barber", value: "Barber" },
  { name: "Beautician", value: "Beautician" },
  { name: "Manicurist", value: "Manicurist" },
  { name: "Beauty Salon", value: "BeautySalon" },
  { name: "Dog Groomer", value: "DogGroomer" },
  { name: "Medical Clinic", value: "MedicalClinic" },
  { name: "Veterinary Clinic", value: "VeterinaryClinic" },
  { name: "Spa And Wellness Center", value: "SpaAndWellnessCenter" },
  { name: "Trainer", value: "Trainer" },
  { name: "Tattoo", value: "TATTOO" },
  { name: "Other", value: "Other" },
];

const lastCalendarOptions: {
  name: string;
  value: TBusinessDetailsValidation["lastCalendar"];
}[] = [
  { name: "Google Calendar", value: "GoogleCalendar" },
  { name: "Other System", value: "OtherSystem" },
  { name: "Physical Calendar", value: "PhysicalCalendar" },
  { name: "None", value: "NONE" },
];
const fromWhereOptions: {
  name: string;
  value: TBusinessDetailsValidation["fromWhere"];
}[] = [
  { name: "Google Search", value: "GoogleSearch" },
  { name: "Internet Advertisement", value: "InternetAdvertisement" },
  { name: "Recommendation", value: "Recommendation" },
  { name: "I saw it in another business", value: "anotherBusiness" },
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
  const selectOptions =
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
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

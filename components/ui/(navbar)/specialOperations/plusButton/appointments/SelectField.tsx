import { TAppointmentValidation } from "@lib/validators/AppointmentValidation";
import { FormDescription, FormField, FormItem, FormMessage } from "@ui/form";
import { Select } from "antd";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FieldType } from "../FormField";
import { Session } from "next-auth";

const SelectField = ({
  control,
  name,
  register,
  label,
  session,
  errors,
}: {
  label: FieldType["label"];
  control: Control<TAppointmentValidation>;
  name: FieldType["name"];
  register: UseFormRegister<TAppointmentValidation>;
  errors: FieldErrors<TAppointmentValidation>;
  session: Session;
}) => {
  const selectOptions =
    name === "Client"
      ? session.user.Customer.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      : session.user.treatments.map((item) => ({
          value: item.id,
          label: item.title,
        }));

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem {...register(name)} style={{ width: "15rem", zIndex: 50 }}>
          <Select
            showSearch
            placeholder={label}
            value={field.value}
            optionFilterProp="children"
            onSelect={(e, option) => {
              console.log(e);
              console.log(option);

              return field.onChange(option);
            }}
            onSearch={onSearch}
            filterOption={filterOption}
            options={selectOptions}
            className="w-full"
          />
          {errors?.[name] && (
            <p className="text-sm text-red-500">{errors[name]?.message}</p>
          )}
          <FormDescription></FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default SelectField;

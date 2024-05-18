"use client";
import { Input } from "@components/input";
import { Label } from "@components/label";
import { ChangeEvent } from "react";
import { ServiceFieldType } from "./ServiceForm";

const FormFields = ({
  label,
  name,
  value,
  handleServicesChange,
}: {
  label: ServiceFieldType["label"];
  name: ServiceFieldType["name"];
  value: ServiceFieldType["value"];
  handleServicesChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div key={name} className="flex flex-col justify-center items-center gap-2">
      <Label htmlFor={name}>{label}</Label>
      {name === "title" ? (
        <Input
          style={{ width: "15rem" }} // Set the specific width here
          placeholder={label}
          onChange={handleServicesChange}
          name={name}
          value={value}
        />
      ) : (
        <Input
          style={{ width: "15rem" }} // Set the specific width here
          type="number"
          value={value || ""}
          name={name}
          step={name === "duration" ? 5 : undefined}
          placeholder={label}
          onChange={handleServicesChange}
        />
      )}
    </div>
  );
};

export default FormFields;

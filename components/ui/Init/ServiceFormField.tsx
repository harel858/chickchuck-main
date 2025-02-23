"use client";
import { Input } from "@components/input";
import { ChangeEvent } from "react";
import { ServiceFieldType } from "./ServiceForm";

const ServiceFormField = ({
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
    <div
      key={name}
      className="flex flex-col justify-center items-center gap-2 w-full"
    >
      <label className="text-gray-700 font-semibold mb-1" htmlFor={name}>
        {label}
      </label>
      {name === "title" ? (
        <Input
          className="w-64 max-w-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={label}
          onChange={handleServicesChange}
          name={name}
          value={value}
        />
      ) : (
        <Input
          className="w-64 max-w-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          value={value || ""}
          name={name}
          step={name === "duration" ? 5 : undefined}
          min={0} // הוספת המאפיין min עם ערך 0
          placeholder={label}
          onChange={handleServicesChange}
        />
      )}
    </div>
  );
};

export default ServiceFormField;

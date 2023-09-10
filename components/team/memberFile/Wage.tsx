import React from "react";
import { UserFileFormData } from "types/types";
import SwitchWage from "../SwitchWage";
import WageField from "../WageField";

interface WageProps {
  typeOfWage: "GLOBALY" | "HOURLY";
  setTypeOfWage: React.Dispatch<React.SetStateAction<"GLOBALY" | "HOURLY">>;
  value: string | null;
  defaultValue: string | null;
  setFormData: React.Dispatch<React.SetStateAction<UserFileFormData>>;
}

function Wage({
  defaultValue,
  setFormData,
  setTypeOfWage,
  typeOfWage,
  value,
}: WageProps) {
  return (
    <li className="flex flex-row justify-between items-start w-full">
      <SwitchWage typeOfWage={typeOfWage} setTypeOfWage={setTypeOfWage} />
      <WageField
        defaultValue={defaultValue}
        value={value}
        setFormData={setFormData}
      />
    </li>
  );
}

export default Wage;

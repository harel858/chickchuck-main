import React from "react";
import { UserFileFormData } from "types/types";
import PhoneFiled from "../form/PhoneFiled";

interface PhoneProps {
  value: string;
  setFormData: React.Dispatch<React.SetStateAction<UserFileFormData>>;
}

function Phone({ value, setFormData }: PhoneProps) {
  return (
    <li className="flex flex-row justify-between items-start w-full">
      <p className="text-lg font-serif font-semibold">Phone</p>
      <PhoneFiled setUserFormData={setFormData} value={value} />
    </li>
  );
}

export default Phone;

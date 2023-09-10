import React, { useState } from "react";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { Treatment, User } from "@prisma/client";
import SwitchWage from "./SwitchWage";
import WageField from "./WageField";
import { UserFileFormData } from "types/types";
import PhoneFiled from "./form/PhoneFiled";
import Wage from "./memberFile/Wage";
import Phone from "./memberFile/Phone";
import Email from "./memberFile/Email";
import MemberServices from "./memberFile/MemberServices";
import { Button } from "@ui/Button";

function UserFile({
  user,
  allServices,
}: {
  user: User & {
    Treatment: Treatment[];
  };
  allServices: Treatment[];
}) {
  const [typeOfWage, setTypeOfWage] = useState<"GLOBALY" | "HOURLY">("HOURLY");
  const [formData, setFormData] = useState<UserFileFormData>({
    salary: typeOfWage === "GLOBALY" ? user.GlobalSalary : user.hourlyWage,
    "phone Number": user.phone,
    email: user.email ? user.email : "",
    services: user.Treatment,
  });
  console.log(formData);

  return (
    <form className="p-0 w-full flex flex-col justify-start items-center overflow-x-hidden gap-10">
      <h2 className="text-2xl font-medium flex flex-row items-center justify-center gap-2">
        {user.name} File
        <BsFillPersonBadgeFill className="text-2xl" />
      </h2>
      <ul className="p-0 flex flex-col justify-center items-center gap-2 w-full">
        <Wage
          typeOfWage={typeOfWage}
          setTypeOfWage={setTypeOfWage}
          defaultValue={
            typeOfWage === "GLOBALY" ? user.GlobalSalary : user.hourlyWage
          }
          value={formData.salary}
          setFormData={setFormData}
        />
        <Phone setFormData={setFormData} value={formData["phone Number"]} />
        <Email setFormData={setFormData} value={formData.email} />
        <MemberServices
          allServices={allServices}
          setFormData={setFormData}
          value={user.Treatment}
        />
      </ul>
      <Button className="bg-blue-600 hover:bg-blue-500 text-white">
        Save Changes
      </Button>
    </form>
  );
}

export default UserFile;

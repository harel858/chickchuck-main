import React, { useState, useTransition } from "react";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { Treatment, User } from "@prisma/client";
import { UserFileFormData } from "types/types";
import Wage from "./memberFile/Wage";
import Phone from "./memberFile/Phone";
import Email from "./memberFile/Email";
import MemberServices from "./memberFile/MemberServices";
import { updateMemberFile } from "actions/updateMember";
import { Button } from "@ui/Button";

function UserFile({
  user,
  allServices,
  setModalOpen,
}: {
  user: User & {
    BreakTime: any;
    Treatment: Treatment[];
  };
  allServices: Treatment[];
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialFormData = {
    salary: user.Wage,
    "phone Number": user.phone,
    email: user.email ? user.email : "",
    services: user.Treatment,
  };
  const [isPanding, setStartPanding] = useTransition();
  const [typeOfWage, setTypeOfWage] = useState<"GLOBALY" | "HOURLY">(
    user.TypeOfWage
  );
  const [formData, setFormData] = useState<UserFileFormData>(initialFormData);
  const hasChanges =
    JSON.stringify({ ...initialFormData, typeOfWage: user.TypeOfWage }) ===
    JSON.stringify({ ...formData, typeOfWage });
  return (
    <form
      onSubmit={() => {
        setStartPanding(() => {
          updateMemberFile(formData, typeOfWage, user.id);
        });
        if (!isPanding) return setModalOpen(false);
      }}
      className="p-0 w-full flex flex-col justify-start items-center overflow-x-hidden gap-7"
    >
      <ul className="p-0 flex flex-col justify-center items-center gap-2 w-full">
        {!user.isAdmin && (
          <Wage
            typeOfWage={typeOfWage}
            setTypeOfWage={setTypeOfWage}
            defaultValue={user.Wage}
            value={formData.salary}
            setFormData={setFormData}
          />
        )}
        <Phone setFormData={setFormData} value={formData["phone Number"]} />
        <Email setFormData={setFormData} value={formData.email} />
        <MemberServices
          allServices={allServices}
          setFormData={setFormData}
          value={user.Treatment}
        />
      </ul>
      <Button
        isLoading={isPanding}
        disabled={hasChanges}
        className="bg-blue-600 hover:bg-blue-500 text-white"
      >
        Save Changes
      </Button>
    </form>
  );
}

export default UserFile;

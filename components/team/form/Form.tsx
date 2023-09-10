import React, { useCallback, useState, useTransition } from "react";
import { Business, User } from "@prisma/client";
import { Button, Input, theme } from "antd";
import { createMember } from "actions/createMember";
import PhoneField from "./PhoneFiled";
import NameField from "./NameField";
import PasswordField from "./PasswordField";
import { CreateUserForm } from "types/types";

const PASSWORD_MISMATCH_ERROR = "Passwords do not match";

const initialUserFormData: CreateUserForm = {
  name: "",
  "phone Number": "",
  password: "",
  "confirm password": "",
};

function Form({
  business,
  current,
  setCurrent,
  setModal1Open,
}: {
  business: Business & {
    user: User[];
  };
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  current: number;
  setModal1Open: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { token } = theme.useToken();
  const [userFormData, setUserFormData] =
    useState<CreateUserForm>(initialUserFormData);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setUserFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    [setUserFormData]
  );

  return (
    <form>
      <div className="flex flex-col items-center justify-center gap-4 py-5">
        {current === 0 && <NameField handleChange={handleChange} />}
        {current === 1 && (
          <PhoneField
            value={userFormData["phone Number"]}
            setUserFormData={setUserFormData}
          />
        )}
        {current === 2 && (
          <PasswordField error={error} handleChange={handleChange} />
        )}

        {current < 2 ? (
          <Button
            onClick={() => setCurrent((prevCurrent) => prevCurrent + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Next
          </Button>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-red-500 font-sans">{error}</p>
            <Button
              onClick={() =>
                startTransition(() => {
                  if (
                    userFormData.password !== userFormData["confirm password"]
                  ) {
                    setError(PASSWORD_MISMATCH_ERROR);
                  } else {
                    createMember(userFormData, business.id);
                    setModal1Open(false);
                  }
                })
              }
              loading={isPending}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Done
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}

export default Form;

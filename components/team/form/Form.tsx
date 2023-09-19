import React, { useCallback, useState, useTransition } from "react";
import { Business, User } from "@prisma/client";
import { Button, Input, theme } from "antd";
import { createMember } from "actions/createMember";
import PhoneField from "./PhoneFiled";
import NameField from "./NameField";
import PasswordField from "./PasswordField";
import { CreateUserForm } from "types/types";
import { NotificationPlacement } from "antd/es/notification/interface";

const PASSWORD_MISMATCH_ERROR = "Passwords do not match";
const PASSWORD_REQUIRED = "Password Field Is Required";
const PHONE_LENGTH_ERROR = "Phone number must be with the length of 10 digits";

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
  successNotification,
}: {
  business: Business & {
    user: User[];
  };
  successNotification: (placement: NotificationPlacement) => void;
  setModal1Open: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  current: number;
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
  const handleSubmit = () =>
    startTransition(() => {
      if (!userFormData.password) return setError(PASSWORD_REQUIRED);
      if (userFormData.password !== userFormData["confirm password"]) {
        setError(PASSWORD_MISMATCH_ERROR);
      } else {
        createMember(userFormData, business.id);
        setCurrent(0);
        successNotification("bottom");
        setUserFormData(initialUserFormData);
        setModal1Open(false);
      }
    });
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
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-red-500 font-sans">{error}</p>
            <Button
              onClick={() => {
                if (current === 1 && userFormData["phone Number"].length < 10)
                  return setError(PHONE_LENGTH_ERROR);
                setError("");
                setCurrent((prevCurrent) => prevCurrent + 1);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Next
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-red-500 font-sans">{error}</p>
            <Button
              onClick={handleSubmit}
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

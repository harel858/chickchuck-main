import { Select } from "antd";
import React from "react";
import { Zoom } from "react-awesome-reveal";

import { AppointmentInput, UserData } from "types/types";

function WithWho({
  userData,
  appointmentInput,
  setAppointmentInput,
  recipientMissing,
}: {
  userData: UserData[];
  setAppointmentInput: React.Dispatch<React.SetStateAction<AppointmentInput>>;
  appointmentInput: AppointmentInput;
  recipientMissing: boolean;
}) {
  const changeRecipient = (userData: UserData) => {
    setAppointmentInput({ ...appointmentInput, user: userData });
  };
  console.log(recipientMissing);

  return (
    <Zoom duration={350} damping={10000}>
      <Select
        defaultValue={"Select Recipient"}
        style={{ width: 200 }}
        onChange={(val, opt) => {
          if (Array.isArray(opt)) return;
          changeRecipient(opt.option);
        }}
        options={userData.map((item) => ({
          value: item.name,
          option: item,
        }))}
        className={`${
          recipientMissing ? "border-2 border-red-500" : "border-none"
        } rounded-xl `}
      />
    </Zoom>
  );
}

export default WithWho;

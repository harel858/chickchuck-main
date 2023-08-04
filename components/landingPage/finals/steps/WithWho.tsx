import React from "react";
import { Select } from "antd";
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
  recipientMissing: string;
}) {
  const changeRecipient = (userData: UserData) => {
    setAppointmentInput({ ...appointmentInput, user: userData });
  };

  return (
    <Zoom duration={350} damping={10000}>
      <Select
        defaultValue={"Select Recipient"}
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

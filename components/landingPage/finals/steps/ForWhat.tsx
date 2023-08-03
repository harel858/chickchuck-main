import React from "react";
import { Zoom } from "react-awesome-reveal";
import { Treatment } from "@prisma/client";
import { AppointmentInput } from "types/types";
import { Select } from "antd";

function ForWhat({
  appointmentInput,
  setAppointmentInput,
  treatmentMissing,
}: {
  appointmentInput: AppointmentInput;
  setAppointmentInput: React.Dispatch<React.SetStateAction<AppointmentInput>>;
  treatmentMissing: boolean;
}) {
  const changeTreatments = (treatement: Treatment) => {
    setAppointmentInput({ ...appointmentInput, treatment: treatement });
  };
  console.log(treatmentMissing);

  return (
    <Zoom duration={350} damping={10000}>
      <Select
        defaultValue={`Select Service`}
        style={{ width: 200 }}
        onChange={(val, opt) => {
          if (Array.isArray(opt)) return;
          changeTreatments(opt.option);
        }}
        options={appointmentInput.user?.treatments.map((item) => ({
          value: item.title,
          option: item,
        }))}
        className={`${
          treatmentMissing ? "border-2 border-red-500" : "border-none"
        } rounded-xl `}
      />
    </Zoom>
  );
}

export default ForWhat;

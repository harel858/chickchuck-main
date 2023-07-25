import React from "react";
import { Zoom } from "react-awesome-reveal";
import { Treatment } from "@prisma/client";
import { AppointmentInput } from "types/types";

function ForWhat({
  appointmentInput,
  setAppointmentInput,
}: {
  appointmentInput: AppointmentInput;
  setAppointmentInput: React.Dispatch<React.SetStateAction<AppointmentInput>>;
}) {
  const changeTreatments = (treatement: Treatment) => {
    setAppointmentInput({ ...appointmentInput, treatment: treatement });
  };
  console.log(
    "appointmentInput.user?.treatments",
    appointmentInput.user?.treatments
  );

  return (
    <Zoom duration={350} damping={10000}>
      <div className="py-12 gap-2 flex flex-wrap align-center items-center">
        {appointmentInput.user?.treatments.map((item) => {
          console.log(appointmentInput.treatment?.id == item?.id);
          return (
            <button
              key={item.id}
              onClick={() => changeTreatments(item)}
              className={`flex flex-row flex-wrap justify-start items-start px-4 py-2 border-2 transition-all border-black ease-in-out duration-300 hover:bg-sky-600 hover:text-white font-medium ${
                appointmentInput.treatment?.id == item?.id
                  ? `bg-sky-600 text-white`
                  : `bg-orange-200`
              } text-black rounded-xl`}
            >
              <p>{item.title}</p>
              <p className="font-normal">{item.cost}$</p>
            </button>
          );
        })}
      </div>
    </Zoom>
  );
}

export default ForWhat;

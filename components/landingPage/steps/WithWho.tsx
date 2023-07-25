import React from "react";
import { Zoom } from "react-awesome-reveal";

import { AppointmentInput, UserData } from "types/types";

function WithWho({
  userData,
  appointmentInput,
  setAppointmentInput,
}: {
  userData: UserData[];
  setAppointmentInput: React.Dispatch<React.SetStateAction<AppointmentInput>>;
  appointmentInput: AppointmentInput;
}) {
  const changeRecipient = (userData: UserData) => {
    setAppointmentInput({ ...appointmentInput, user: userData });
  };

  return (
    <Zoom duration={350} damping={10000}>
      <div className="py-12 gap-2 flex flex-wrap align-center items-center">
        {userData.map((item) => (
          <button
            key={item.userId}
            onClick={() => changeRecipient(item)}
            className={`px-4 py-2 border-2 transition-all border-black ease-in-out duration-300 hover:bg-sky-600 hover:text-white font-medium ${
              appointmentInput.user?.userId == item?.userId
                ? `bg-sky-600 text-white`
                : `bg-orange-200`
            } text-black rounded-xl`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </Zoom>
  );
}

export default WithWho;

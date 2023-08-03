"use client";
import { useState } from "react";
import AvailableList from "../AvailableList";
import { AppointmentInput, StepThreeProps } from "../../../types/types";
import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import WithWho from "./steps/WithWho";
import ForWhat from "./steps/ForWhat";
import { Button } from "@ui/Button";

function Steps({ userData }: StepThreeProps) {
  // Get the user session
  const { data: session } = useSession();

  // Initialize the state with an object directly
  const [appointmentInput, setAppointmentInput] = useState<AppointmentInput>({
    treatment: null,
    availableSlot: [],
    user: null,
    date: dayjs(),
  });

  const [treatmentMissing, setTreatmentMissing] = useState(false);
  const [recipientMissing, setRecipientMissing] = useState(false);

  const handleSubmit = async () => {
    // Reset missing fields state
    setTreatmentMissing(false);
    setRecipientMissing(false);

    // Check for missing fields
    if (!appointmentInput.treatment) setTreatmentMissing(true);
    if (!appointmentInput.user) setRecipientMissing(true);

    // Proceed only if both treatment and recipient are selected
    if (!appointmentInput.treatment || !appointmentInput.user) return;

    try {
      const res = await axios.post("api/appointments", {
        ...appointmentInput,
        customerId: session?.user.id,
      });
      // Do something with the response if needed
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-1/2 max-md:w-full flex flex-col justify-center content-center items-center gap-5 p-5 bg-slate-100 rounded-xl max-xl:rounded-t-none shadow-sm shadow-black border-x border-b border-gray-500">
      <h2 className={`text-slate-900 font-normal font-serif text-2xl`}>
        Book An Appointment
      </h2>
      <div className="flex max-md:flex-col justify-center items-center gap-5">
        <WithWho
          userData={userData}
          setAppointmentInput={setAppointmentInput}
          appointmentInput={appointmentInput}
          recipientMissing={treatmentMissing} // Use the combined state
        />
        <ForWhat
          setAppointmentInput={setAppointmentInput}
          appointmentInput={appointmentInput}
          treatmentMissing={recipientMissing} // Use the combined state
        />
      </div>
      <AvailableList
        appointmentInput={appointmentInput}
        setAppointmentInput={setAppointmentInput}
        userData={userData}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

export default Steps;

"use client";
import { useEffect, useState } from "react";
import Loading from "../../../app/[businessName]/loading";
import AvailableList from "../AvailableList";
import { AppointmentInput, StepThreeProps } from "../../../types/types";
import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import WithWho from "./steps/WithWho";
import ForWhat from "./steps/ForWhat";
import { Lobster } from "next/font/google";
import { Button } from "@ui/Button";
const lobster = Lobster({ weight: ["400"], subsets: ["vietnamese"] });

function Steps({ userData }: StepThreeProps) {
  const session = useSession();
  const [appointmentInput, setAppointmentInput] = useState<AppointmentInput>({
    treatment: null,
    availableSlot: [],
    user: null,
    date: dayjs(),
  });

  const [activeStep, setActiveStep] = useState(0);
  const [animate, setAnimate] = useState(false);

  let steps = [
    {
      label: "With Who?",
      description: (
        <WithWho
          userData={userData}
          setAppointmentInput={setAppointmentInput}
          appointmentInput={appointmentInput}
        />
      ),
    },
    {
      label: "For What?",
      description: (
        <ForWhat
          setAppointmentInput={setAppointmentInput}
          appointmentInput={appointmentInput}
        />
      ),
    },
    {
      label: "When?",
      description: (
        <AvailableList
          appointmentInput={appointmentInput}
          setAppointmentInput={setAppointmentInput}
          userData={userData}
        />
      ),
    },
  ];
  if (userData.length === 1 && userData[0]) {
    steps = steps.slice(1);
  }

  useEffect(() => {
    setAnimate(true);

    if (userData.length === 1 && userData[0]) {
      setAppointmentInput({ ...appointmentInput, user: userData[0] });
    }
  }, []);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("api/appointments", {
        ...appointmentInput,
        customerId: session.data?.user.id,
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="w-1/2 max-md:w-full flex flex-col justify-start content-start items-start p-5 bg-slate-100 rounded-xl max-xl:rounded-t-none shadow-sm shadow-black border-x border-b border-gray-500">
      <h2 className={`text-slate-900 font-normal text-xl`}>
        Last steps and we are done
      </h2>
      <div className="flex justify-center items-center gap-10">
        <WithWho
          userData={userData}
          setAppointmentInput={setAppointmentInput}
          appointmentInput={appointmentInput}
        />
        <ForWhat
          setAppointmentInput={setAppointmentInput}
          appointmentInput={appointmentInput}
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

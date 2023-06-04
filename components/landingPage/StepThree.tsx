"use client";
import React, { useState } from "react";
import { Treatment } from "@prisma/client";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Poppins } from "@next/font/google";
import { Zoom } from "react-awesome-reveal";
import Loading from "../../app/[businessName]/loading";
import AvailableList from "./AvailableList";
import { AppointmentInput, UserData } from "../../types/types";
import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

type StepThreeProps = {
  userData: UserData[];
};

const font = Poppins({
  subsets: ["latin"],
  weight: "400",
});

function StepThree({ userData }: StepThreeProps) {
  const session = useSession();
  const [appointmentInput, setAppointmentInput] = useState<AppointmentInput>({
    treatment: null,
    availableSlot: [],
    user: null,
    date: dayjs(),
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    setAnimate(true);
  }, []);

  const changeRecipient = (userData: UserData) => {
    setAppointmentInput({ ...appointmentInput, user: userData });
  };

  const changeTreatments = (treatement: Treatment) => {
    setAppointmentInput({ ...appointmentInput, treatment: treatement });
  };

  const steps = [
    {
      label: "With Who",
      description: (
        <div className="py-12 gap-2 flex flex-wrap align-center items-center">
          {userData.map((item) => (
            <button
              key={item.userId}
              onClick={() => changeRecipient(item)}
              className={`${
                font.className
              } px-4 py-2  border-2 transition-all border-black ease-in-out duration-300 hover:bg-orange-500 font-medium ${
                appointmentInput.user?.userId == item?.userId
                  ? `bg-orange-500  text-lg`
                  : `bg-rose-100 text-base  `
              } hover:text-lg   text-black rounded-xl`}
            >
              {item.name}
            </button>
          ))}
        </div>
      ),
    },
    {
      label: "For What",
      description: (
        <div className="py-12 gap-2 flex flex-wrap align-center items-center">
          {appointmentInput.user?.treatments.map((item) => (
            <button
              key={item.id}
              onClick={() => changeTreatments(item)}
              className={`${
                font.className
              } px-4 py-2  border-2 transition-all border-black ease-in-out duration-300 hover:bg-orange-500 font-medium ${
                appointmentInput.treatment?.id == item?.id
                  ? `bg-orange-500  text-lg`
                  : `bg-rose-100 text-base  `
              } hover:text-lg   text-black rounded-xl`}
            >
              {item.title}
            </button>
          ))}
        </div>
      ),
    },
    {
      label: "Create an ad",
      description: (
        <AvailableList
          appointmentInput={appointmentInput}
          setAppointmentInput={setAppointmentInput}
          userData={userData}
        />
      ),
    },
  ];
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
    console.log(appointmentInput);

    try {
      const res = await axios.post("api/appointments", {
        ...appointmentInput,
        customerId: session.data?.user.id,
      });
      console.log(res.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="w-fit max-md:w-11/12 flex justify-start content-center items-center dark:bg-orange-400/70 bg-orange-400/80 p-10 rounded-3xl shadow-2xl dark:shadow-white/10 ">
      {animate ? (
        <Zoom duration={350} damping={10000}>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    <h2
                      className={`${
                        activeStep === index ? `font-semibold` : `font-light`
                      } text-xl text-white`}
                    >
                      {step.label}
                    </h2>
                  </StepLabel>
                  <StepContent>
                    <div>{step.description}</div>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          color={index === 1 ? "success" : "info"}
                          onClick={
                            index === steps.length - 1
                              ? handleSubmit
                              : handleNext
                          }
                          sx={{ mt: 1, mr: 1, backgroundColor: `#fb923c` }}
                        >
                          {index === steps.length - 1 ? "Submit" : "Continue"}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button
                  onClick={handleReset}
                  sx={{ mt: 1, mr: 1, borderRadius: `4em` }}
                >
                  Reset
                </Button>
              </Paper>
            )}
          </Box>
        </Zoom>
      ) : (
        <Loading />
      )}
    </div>
  );
}
export default StepThree;

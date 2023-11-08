// Verification Component
"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Typography from "@mui/material/Typography";
import StepOne from "./landingPage/verification/stepOne";
import StepTwo from "./landingPage/verification/stepTwo";
import { BusinessData, UserData, VerificationData } from "../types/types";
import { Business, Customer, Treatment, User } from "@prisma/client";

export default function Verification({
  businessData,
}: {
  businessData: {
    usersData: UserData[];
    business: Business & {
      user: (User & {
        Treatment: Treatment[];
      })[];
      Customer: Customer[];
    };
  };
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [input, setInput] = useState<VerificationData>({
    name: "",
    phoneNumber: "",
    request_id: "",
    code: "",
    bussinesId: businessData.business.id,
  });

  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = event.target;

      if (name === "phoneNumber") {
        const onlyDigits = value.replace(/\D/g, "");
        setInput((prevInput) => ({
          ...prevInput,
          [name]: onlyDigits,
        }));
      } else {
        setInput((prevInput) => ({
          ...prevInput,
          [name]: value,
        }));
      }
    },
    [input]
  );

  const steps = useMemo(
    () => [
      {
        label: <h4 className="text-slate-900">Enter Your details</h4>,
        content: (
          <StepOne
            input={input}
            setInput={setInput}
            handleChange={handleChange}
            handleNext={handleNext}
          />
        ),
      },
      {
        label: <h4 className="text-black">Verify code</h4>,
        content: (
          <StepTwo
            handleChange={handleChange}
            input={input}
            setInput={setInput}
            handleNext={handleNext}
          />
        ),
      },
    ],
    [input]
  );

  function handleNext() {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <div className="w-1/2 max-md:w-full flex justify-center content-center items-center p-5 bg-slate-100 rounded-xl max-xl:rounded-t-none shadow-sm shadow-black border-x border-b border-gray-500">
      <div className="w-full">
        <Stepper sx={{ color: "black" }} activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={index} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {step.label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div className="flex flex-col justify-center items-center">
          {activeStep >= 2 ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>{steps[activeStep]?.content}</React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

// Verification Component
"use client";
import React, { useState, useMemo } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Typography from "@mui/material/Typography";
import StepOne from "./landingPage/verification/stepOne";
import StepTwo from "./landingPage/verification/stepTwo";
import { UserData, VerificationData } from "../types/types";

export default function Verification({ userData }: { userData: UserData[] }) {
  const [activeStep, setActiveStep] = useState(0);
  const [input, setInput] = useState<VerificationData>({
    name: "",
    phoneNumber: "",
    request_id: "",
    code: "",
  });

  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      console.log(input);

      const { name, value } = event.target;
      console.log(name);

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
        label: <h4>Enter Your details</h4>,
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
        label: <h4>Verify code</h4>,
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
    <div className="w-1/2 max-md:w-11/12 flex justify-center content-center items-center dark:bg-orange-400/70 bg-orange-400/80 p-10 rounded-3xl shadow-2xl dark:shadow-white/10 ">
      <div className="w-full">
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={index} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {step.label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep >= 2 ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>{steps[activeStep].content}</React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

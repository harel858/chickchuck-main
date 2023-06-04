"use client";
import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Typography from "@mui/material/Typography";
import StepOne from "../landingPage/verification/stepOne";
import Loading from "../../app/[businessName]/loading";
import StepTwo from "../landingPage/verification/stepTwo";
import StepThree from "../landingPage/StepThree";
import { AppointmentInput, UserData } from "../../types/types";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

export default function HorizontalNonLinearStepper({
  userData,
}: {
  userData: UserData[];
}) {
  const session = useSession();

  const userId = session.data?.user.id;

  const [activeStep, setActiveStep] = React.useState(userId ? 2 : 0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const steps = [
    {
      label: <h4></h4>,
      content: <React.Suspense fallback={<Loading />}></React.Suspense>,
    },
    {
      label: "Tab 2",
    },
    {
      label: "Tab 3",
      content: <StepThree userData={userData} />,
    },
  ];

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  function handleNext() {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
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
        {allStepsCompleted() ? (
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
  );
}

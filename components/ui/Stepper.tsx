"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepOne from "../../app/[businessName]/stepOne";
import Loading from "../../app/[businessName]/loading";
import StepTwo from "../../app/[businessName]/stepTwo";
import StepThree from "../../app/[businessName]/StepThree";
import { AppointmentInput, formData, UserData } from "../../types/types";
import dayjs from "dayjs";

export default function HorizontalNonLinearStepper({
  userData,
}: {
  userData: UserData[];
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [customerInput, setCustomerInput] = React.useState<formData>({
    name: "",
    request_id: "",
    phoneNumber: "",
    code: "",
  });
  const [appointmentInput, setAppointmentInput] =
    React.useState<AppointmentInput>({
      treatment: null,
      customer: null,
      availableSlot: [],
      user: null,
      date: dayjs(),
    });

  const steps = [
    {
      label: "Tab 1",
      content: (
        <React.Suspense fallback={<Loading />}>
          <StepOne
            handleNext={handleNext}
            customerInput={customerInput}
            setCustomerInput={setCustomerInput}
          />
        </React.Suspense>
      ),
    },
    {
      label: "Tab 2",
      content: (
        <StepTwo
          handleNext={handleNext}
          customerInput={customerInput}
          appointmentInput={appointmentInput}
          setAppointmentInput={setAppointmentInput}
          setCustomerInput={setCustomerInput}
        />
      ),
    },
    {
      label: "Tab 3",
      content: (
        <StepThree
          appointmentInput={appointmentInput}
          setAppointmentInput={setAppointmentInput}
          userData={userData}
        />
      ),
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
    <Box sx={{ width: "80%" }}>
      <Stepper nonLinear activeStep={activeStep}>
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
    </Box>
  );
}

"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Loading from "../../app/[businessName]/loading";
import AvailableList from "./AvailableList";
import { AppointmentInput, StepThreeProps } from "../../types/types";
import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import WithWho from "./steps/WithWho";
import ForWhat from "./steps/ForWhat";

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

  const steps = [
    {
      label: "For Who?",
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
    <div className="w-1/2 max-md:w-full flex justify-start content-start items-start p-5 bg-slate-900  rounded-lg max-xl:rounded-t-none shadow-sm shadow-black border-x border-b border-gray-500">
      {animate ? (
        <>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption" sx={{ color: "white" }}>
                          Last step
                        </Typography>
                      ) : null
                    }
                  >
                    <h2
                      className={`${
                        activeStep === index ? `font-semibold` : `font-light`
                      } text-xl text-white text-start font-semibold`}
                    >
                      {step.label}
                    </h2>
                  </StepLabel>
                  <StepContent sx={{ width: "100%" }}>
                    <div className="w-full">{step.description}</div>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          disabled={
                            index === 0
                              ? !appointmentInput.user?.userId
                              : index === 1
                              ? !appointmentInput.treatment?.id
                              : index === 2 &&
                                appointmentInput.availableSlot.length === 0
                          }
                          color={index === 2 ? "success" : "primary"}
                          onClick={
                            index === steps.length - 1
                              ? handleSubmit
                              : handleNext
                          }
                          sx={{
                            mt: 1,
                            mr: 1,
                          }}
                        >
                          {index === steps.length - 1 ? "Book It Now" : "Next"}
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
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
export default StepThree;

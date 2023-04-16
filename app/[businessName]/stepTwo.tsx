"use client";
import React from "react";
import axios from "axios";
import { Zoom } from "react-awesome-reveal";
import { TextField, Button } from "@mui/material";
import { Poppins } from "@next/font/google";
import { AppointmentInput, formData } from "../../types/types";
import { LoadingButton } from "@mui/lab";
import { Appointment, Customer } from "@prisma/client";

interface StepTwoProps {
  handleNext: () => void;
  customerInput: formData;
  appointmentInput: AppointmentInput;
  setAppointmentInput: React.Dispatch<React.SetStateAction<AppointmentInput>>;
  setCustomerInput: React.Dispatch<React.SetStateAction<formData>>;
}
const font = Poppins({
  subsets: ["latin"],
  weight: "400",
});

function StepTwo({
  handleNext,
  customerInput,
  appointmentInput,
  setCustomerInput,
  setAppointmentInput,
}: StepTwoProps) {
  console.log(customerInput.request_id);

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInput({
      ...customerInput,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setLoading(true);
    e.preventDefault();

    try {
      const res = await axios.post(`/api/verification/steptwo`, customerInput);
      if (res.status === 200) {
        const customer = res.data as Customer;
        setAppointmentInput({ ...appointmentInput, customer });

        setLoading(false);
        handleNext();
      }
    } catch (err: any) {
      setLoading(false);
      err.response.data && setError(err.response.data);
      console.log(err);
    }
  };

  return (
    <Zoom duration={350} damping={10000}>
      <form
        onSubmit={submitForm}
        className="flex flex-col items-center justify-center gap-12 "
      >
        <TextField
          id="outlined-basic"
          label="Enter verification code"
          variant="filled"
          error={error ? true : false}
          name="code"
          onChange={handleChange}
          InputProps={{
            style: { color: `white`, fontSize: `1.2em` },
          }}
          InputLabelProps={{
            style: {
              fontSize: "1.1em",
              fontWeight: "500",
              color: `rgba(245,245,220,.6)`,
            },
          }}
          sx={{
            bgcolor: "rgba(255, 255, 225,.2)",
            borderRadius: "8px",
          }}
        />
        <Zoom duration={350} damping={10000} delay={150}>
          <LoadingButton
            variant="contained"
            className={`bg-orange-400 ${font.className} tracking-widest`}
            style={
              loading ? { backgroundColor: `#fb923c !important` } : undefined
            }
            color="warning"
            type="submit"
            loading={loading}
            sx={
              loading
                ? {
                    fontSize: `1.1em`,
                    fontFamily: `sans-serif`,
                    borderRadius: `15px`,
                    backgroundColor: `#fb923c !important`,
                  }
                : {
                    fontSize: `1.1em`,
                    fontFamily: `sans-serif`,
                    borderRadius: `15px`,
                  }
            }
          >
            Send SMS
          </LoadingButton>
        </Zoom>
      </form>
    </Zoom>
  );
}

export default StepTwo;

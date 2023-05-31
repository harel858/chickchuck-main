"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { Zoom } from "react-awesome-reveal";
import { TextField } from "@mui/material";
import { VerificationData } from "../../types/types";
import { useRouter } from "next/navigation";
import { Button } from "@ui/Button";

const StepTwo = React.memo(
  ({
    handleNext,
    input,
    setInput,
    handleChange,
  }: {
    handleNext: () => void;
    input: VerificationData;
    setInput: React.Dispatch<React.SetStateAction<VerificationData>>;
    handleChange: (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void;
  }) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
      setError("");
      setLoading(true);
      e.preventDefault();
      console.log(input);

      try {
        const res = await axios.post("/api/verification/steptwo", input);
        if (res.status === 200) {
          const { phoneNumber } = input;
          const res = await signIn("Customer Login", {
            phoneNumber,
            redirect: false,
          });
          console.log(res);

          setLoading(false);
          handleNext();
          router.refresh();
        }
      } catch (err: any) {
        console.log(err);
        if (err instanceof AxiosError) {
          console.log(err.message);
          setError(err.message);
        }
        console.log(err);

        setLoading(false);
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
            <Button
              variant="default"
              className="bg-sky-600 dark:bg-sky-800 text-xl rounded-xl tracking-widest"
              isLoading={loading}
            >
              Verify
            </Button>
          </Zoom>
        </form>
      </Zoom>
    );
  }
);

export default StepTwo;

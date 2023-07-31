"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { Zoom } from "react-awesome-reveal";
import { TextField } from "@mui/material";
import { VerificationData } from "../../../types/types";
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
          className="flex flex-col items-center gap-8 mt-4 w-full p-5 "
        >
          <TextField
            id="outlined-basic"
            label="Enter verification code"
            variant="filled"
            error={error ? true : false}
            name="code"
            onChange={handleChange}
            InputProps={{
              style: {
                color: "black",
                fontSize: "1.2em",
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "1.1em",
                fontWeight: "500",
                color: "rgb(15 23 42 / 0.8)",
              },
            }}
            sx={{
              width: "100%",
              bgcolor: "rgba(0, 0, 0, 0.01)",
              borderRadius: "8px",
              borderColor: "#e0e0e0",
              ...(error && { boxShadow: "0px 0px 0px 2px red" }),
            }}
          />
          <Zoom duration={350} damping={10000} delay={150}>
            <Button
              variant="default"
              className="bg-sky-600 dark:bg-sky-800 text-xl rounded-xl min-w-max max-2xl:w-8/12 tracking-widest"
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

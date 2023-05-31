"use client";
import React, { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import { TextField } from "@mui/material";
import { Button } from "@ui/Button";
import { VerificationData } from "../../types/types";

const StepOne = React.memo(
  ({
    handleNext,
    handleChange,
    input,
    setInput,
  }: {
    handleNext: () => void;
    handleChange: (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void;
    input: VerificationData;
    setInput: React.Dispatch<React.SetStateAction<VerificationData>>;
  }) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submitForm = useCallback(
      async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(input);

        e.preventDefault();
        setError("");
        setLoading(true);

        try {
          const res = await axios.post("/api/verification/stepone", input);

          if (res.status === 200) {
            const data = res.data;
            setInput((prevInput) => ({
              ...prevInput,
              request_id: data.request_id,
            }));
            setLoading(false);
            handleNext();
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
      },
      [input]
    );

    return (
      <form
        onSubmit={submitForm}
        className="flex flex-col items-center gap-12 mt-4 w-full"
      >
        <div className="flex flex-col items-center gap-8 mt-4">
          <TextField
            id="outlined-basic"
            label="Enter Name"
            name="name"
            onChange={handleChange}
            error={Boolean(error)}
            variant="filled"
            InputProps={{
              style: { color: "white", fontSize: "1.2em" },
              inputMode: "numeric",
            }}
            InputLabelProps={{
              style: {
                fontSize: "1.1em",
                fontWeight: "500",
                color: "rgba(245, 245, 220, 0.6)",
              },
            }}
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "8px",
              ":after": { border: "4px solid white" },
              ...(error && { boxShadow: "0px 0px 0px 2px red" }),
            }}
          />

          <TextField
            id="outlined-basic"
            label="Phone Number"
            name="phoneNumber"
            variant="filled"
            onChange={handleChange}
            error={Boolean(error)}
            InputProps={{
              style: { color: "white", fontSize: "1.2em" },
            }}
            InputLabelProps={{
              style: {
                fontSize: "1.1em",
                fontWeight: "500",
                color: "rgba(245, 245, 220, 0.6)",
              },
            }}
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "8px",
              borderColor: "#e0e0e0",
              ...(error && { boxShadow: "0px 0px 0px 2px red" }),
            }}
          />
        </div>

        <Button
          variant="default"
          className="bg-sky-600 dark:bg-sky-800 text-xl rounded-xl tracking-widest"
          isLoading={loading}
        >
          Send SMS
        </Button>
      </form>
    );
  }
);

export default StepOne;

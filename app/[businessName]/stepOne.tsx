"use client";
import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { Button } from "@ui/Button";

const StepOne = React.memo(({ handleNext }: { handleNext: () => void }) => {
  const [input, setInput] = useState({
    name: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
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
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/verification/stepone", input);
      const data = res.data;
      setInput((prevInput) => ({
        ...prevInput,
        request_id: data.request_id,
        phoneNumber: data.phoneNumber,
      }));

      if (res.status === 200) {
        setLoading(false);
        handleNext();
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data || err.message);
    }
  };

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
});

export default StepOne;

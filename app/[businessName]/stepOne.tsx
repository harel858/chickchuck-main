"use client";
import React from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { Poppins } from "@next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: "400",
});
type formData = {
  name: string;
  phoneNumber: string;
};

function StepOne({ handleNext, setRequestId }: any) {
  const [stepOneData, setStepOneData] = React.useState<formData>({
    name: "",
    phoneNumber: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStepOneData({
      ...stepOneData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(stepOneData.name);

    try {
      const res = await axios.post(`/api/verification/stepone`, stepOneData);
      setRequestId(res.data);
      if (res.status === 200) handleNext();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col items-center gap-8 mt-4"
    >
      <div className="flex flex-col items-center gap-4 mt-4">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="filled"
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

        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="filled"
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
            borderColor: "#e0e0e0",
          }}
        />
      </div>

      <Button
        variant="contained"
        className={`bg-orange-400 ${font.className} tracking-widest		`}
        color="warning"
        sx={{
          fontSize: `1.2em`,
          fontFamily: `sans-serif`,
          borderRadius: `10px`,
        }}
        onClick={handleNext}
      >
        Send SMS
      </Button>
    </form>
  );
}

export default StepOne;

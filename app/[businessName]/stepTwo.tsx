"use client";
import React from "react";
import axios from "axios";
import { Zoom } from "react-awesome-reveal";
import { TextField, Button } from "@mui/material";
import { Poppins } from "@next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: "400",
});
type formData = {
  request_id: string;
  code: string;
};

function StepTwo({ handleNext, requestId }: any) {
  console.log(requestId);

  const [stepTwoData, setStepTwoData] = React.useState<formData>({
    request_id: requestId,
    code: "",
  });
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStepTwoData({
      ...stepTwoData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setLoading(true);
    e.preventDefault();

    try {
      const res = await axios.post(`/api/verification/steptwo`, stepTwoData);
      if (res.status === 200) {
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
            variant="contained"
            className={`bg-orange-400 ${font.className} tracking-wides`}
            color="warning"
            sx={{
              fontSize: `1.1em`,
              fontFamily: `sans-serif`,
              borderRadius: `15px`,
            }}
            onClick={handleNext}
          >
            Send SMS
          </Button>
        </Zoom>
      </form>
    </Zoom>
  );
}

export default StepTwo;

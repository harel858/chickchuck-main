"use client";
import React, { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Button, CircularProgress, TextField } from "@mui/material";
import { Poppins } from "@next/font/google";
import { JackInTheBox } from "react-awesome-reveal";
import { LoadingButton } from "@mui/lab";

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

  const [error, setError] = React.useState("");
  const [animate, setAnimate] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStepOneData({
      ...stepOneData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    console.log(stepOneData.name);

    try {
      const res = await axios.post(`/api/verification/stepone`, stepOneData);
      setRequestId(res.data);
      console.log(res.data);

      if (res.status === 200) {
        setLoading(false);
        handleNext();
      }
    } catch (err: any) {
      setLoading(false);
      err.response.data && setError(err.response.data);
    }
  };

  return (
    <>
      {animate ? (
        <JackInTheBox duration={500}>
          <form
            onSubmit={handleNext}
            className="flex flex-col items-center gap-12 mt-4"
          >
            <div className="flex flex-col items-center gap-8 mt-4">
              <TextField
                id="outlined-basic"
                label="Enter Name"
                error={error ? true : false}
                variant="outlined"
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
                  ":after": { border: `4px solid white ` },
                }}
              />

              <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
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
                  borderColor: "#e0e0e0",
                }}
              />
            </div>
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
          </form>
        </JackInTheBox>
      ) : (
        <CircularProgress size={80} color="warning" />
      )}
    </>
  );
}

export default StepOne;

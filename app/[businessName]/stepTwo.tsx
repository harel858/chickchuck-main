"use client";
import React, { useState } from "react";
import axios from "axios";
import { Zoom } from "react-awesome-reveal";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const StepTwo = React.memo(({ handleNext }: { handleNext: () => void }) => {
  const [input, setInput] = useState({
    request_id: "",
    code: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setLoading(true);
    e.preventDefault();

    try {
      const res = await axios.post("/api/verification/steptwo", input);
      if (res.status === 200) {
        const customer = res.data;
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
          <Button
            variant="contained"
            className={`bg-orange-400`}
            style={
              loading ? { backgroundColor: `#fb923c !important` } : undefined
            }
            color="warning"
            type="submit"
            disabled={loading}
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
            {loading ? (
              <>
                <i className="fa fa-spinner fa-spin mr-2" />
                Loading
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </Zoom>
      </form>
    </Zoom>
  );
});

export default StepTwo;

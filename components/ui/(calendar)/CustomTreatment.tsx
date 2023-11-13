import React from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import { IoMdStopwatch } from "react-icons/io";

function CustomTreatment({
  duration,
  changeDuration,
}: {
  duration: number;
  changeDuration: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <TextField
      id="outlined-basic"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IoMdStopwatch />
          </InputAdornment>
        ),
        style: { color: "black", fontSize: "1.2em" },
        inputMode: "numeric",
      }}
      variant={"standard"}
      label={"Appointment Duration"}
      name={"Appointment Duration"}
      color={"primary"}
      value={duration}
      onChange={changeDuration}
      required
      type={"number"}
      inputProps={{
        step: "5",
        pattern: "/^e-[0-9]+$/",
        min: 0,
        style: {
          color: "black",
          fontSize: "1.2em",
        },
      }}
      InputLabelProps={{
        style: {
          fontSize: "1.5em",
          fontWeight: "500",
        },
      }}
      sx={{
        width: "100%",
        borderRadius: "4px",
        ":after": { border: "4px solid white" },
      }}
    />
  );
}

export default CustomTreatment;

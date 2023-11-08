import React from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import { BsWatch } from "react-icons/bs";

function CustomTreatment({
  duration,
  setDuration,
  setTitle,
  title,
}: {
  title: string;
  duration: string;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <TextField
      id="outlined-basic"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <BsWatch />
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

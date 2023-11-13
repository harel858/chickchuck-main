import React from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import { MdOutlineTitle } from "react-icons/md";

function AppointmentTitle({
  title,
  changeTitle,
}: {
  changeTitle: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  title: string;
}) {
  return (
    <TextField
      id="outlined-basic"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MdOutlineTitle />
          </InputAdornment>
        ),
        style: { color: "black", fontSize: "1.2em" },
        inputMode: "numeric",
      }}
      variant={"standard"}
      label={"Appointment Title"}
      name={"Appointment Title"}
      color={"primary"}
      value={title}
      onChange={changeTitle}
      required
      type={"text"}
      inputProps={{
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

export default AppointmentTitle;

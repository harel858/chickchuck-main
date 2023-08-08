import React from "react";
import { Zoom } from "react-awesome-reveal";
import { Treatment } from "@prisma/client";
import { AppointmentInput } from "types/types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
function ForWhat({
  appointmentInput,
  setAppointmentInput,
}: {
  appointmentInput: AppointmentInput;
  setAppointmentInput: React.Dispatch<React.SetStateAction<AppointmentInput>>;
  treatmentMissing: string;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    const treatement = appointmentInput.user?.treatments.find(
      (item) => item.id === event.target.value
    );
    console.log(treatement);
    if (!treatement) return;
    setAppointmentInput({ ...appointmentInput, treatment: treatement });
  };
  return (
    <Zoom duration={350} damping={10000}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Service</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={appointmentInput.treatment?.id}
          onChange={handleChange}
          label="Service"
        >
          {appointmentInput.user?.treatments.map((item) => (
            <MenuItem value={item.id}>{item.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Zoom>
  );
}

export default ForWhat;

import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip } from "@mui/material";
import { AppointmentInput } from "types/types";
import { SelectChangeEvent } from "@mui/material/Select";

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
  const options = appointmentInput.user?.treatments.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const handleSelectChange = (id: string | undefined) => {
    const treatment = appointmentInput.user?.treatments.find(
      (item) => item.id === id
    );
    if (!treatment || !id) return;
    setAppointmentInput({ ...appointmentInput, treatment: treatment });
  };

  return (
    <Autocomplete
      disabled={!appointmentInput.user}
      disablePortal
      id="combo-box-demo"
      options={options || []}
      sx={{ width: 300, minWidth: 200 }}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            key={params.id}
            placeholder="Select Client"
            variant="standard"
          />
        );
      }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.value}>
            {option.label}
          </li>
        );
      }}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option.value}
            label={option.label}
          />
        ));
      }}
      onChange={(e, value) => handleSelectChange(value?.value)}
    />
  );
}

export default ForWhat;

import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AppointmentInput, UserData } from "types/types";

function WithWho({
  userData,
  appointmentInput,
  setAppointmentInput,
  recipientMissing,
}: {
  userData: UserData[];
  setAppointmentInput: React.Dispatch<React.SetStateAction<AppointmentInput>>;
  appointmentInput: AppointmentInput;
  recipientMissing: string;
}) {
  const handleSelectChange = (id: string | undefined) => {
    const user = userData.find((item) => item.userId === id);
    if (!user || !id) return;
    setAppointmentInput({ ...appointmentInput, user: user });
  };

  const options = userData.map((item) => ({
    value: item.userId,
    label: item.name,
  }));
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300, minWidth: 200 }}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            key={params.id}
            placeholder="Select Recipient"
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

export default WithWho;

/*  <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              key={params.id}
              placeholder="Activity Days"
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
      /> */

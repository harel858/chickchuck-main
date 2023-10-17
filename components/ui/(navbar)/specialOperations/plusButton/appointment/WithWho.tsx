import React, { useEffect, useRef } from "react";
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
  const isInit = useRef(true);
  useEffect(() => {
    console.log(isInit);

    if (isInit.current) {
      isInit.current = false;
      return;
    }
  }, []);

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
      value={
        appointmentInput.user
          ? {
              label: appointmentInput.user?.name,
              value: appointmentInput.user?.userId,
            }
          : null
      }
      sx={{ width: 180, minWidth: 120 }}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => {
        return (
          <TextField
            error={!isInit.current && !!recipientMissing}
            {...params}
            label={
              <p className="font-serif text-xl flex justify-center items-center gap-1">
                Recipient
              </p>
            }
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

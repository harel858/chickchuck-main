import React, { useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip } from "@mui/material";
import { AppointmentInput } from "types/types";
import { SelectChangeEvent } from "@mui/material/Select";

function ForWhat({
  appointmentInput,
  setAppointmentInput,
  treatmentMissing,
}: {
  appointmentInput: AppointmentInput;
  setAppointmentInput: React.Dispatch<React.SetStateAction<AppointmentInput>>;
  treatmentMissing: string;
}) {
  const isInit = useRef(true);
  useEffect(() => {
    console.log(isInit);

    if (isInit.current) {
      isInit.current = false;
      return;
    }
  }, []);

  const options = appointmentInput.user?.treatments.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const handleSelectChange = (id: string | undefined) => {
    console.log(id);

    const treatment = appointmentInput.user?.treatments.find(
      (item) => item.id === id
    );
    if (!treatment || !id)
      return setAppointmentInput({ ...appointmentInput, treatment: null });

    setAppointmentInput({ ...appointmentInput, treatment: treatment });
  };

  return (
    <Autocomplete
      disabled={!appointmentInput.user}
      disablePortal
      id="combo-box-demo"
      options={options || []}
      sx={{ width: 180, minWidth: 120 }}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => {
        return (
          <TextField
            error={!isInit.current && !!treatmentMissing}
            {...params}
            key={params.id}
            placeholder="Select Service"
            label={
              <p className="font-serif text-xl flex justify-center items-center gap-1">
                Service
              </p>
            }
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

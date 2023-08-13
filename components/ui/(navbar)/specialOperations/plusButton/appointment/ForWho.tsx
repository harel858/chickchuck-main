"use client";
import React, { useEffect, useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import TextField from "@mui/material/TextField";
import { Chip } from "@mui/material";
import { AppointmentInput, BusinessData } from "types/types";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ForWho = ({
  businessData,
  appointmentInput,
  setAppointmentInput,
  customerMissing,
}: {
  businessData: BusinessData;
  setAppointmentInput: React.Dispatch<React.SetStateAction<AppointmentInput>>;
  appointmentInput: AppointmentInput;
  customerMissing: string;
}) => {
  const isInit = useRef(true);
  useEffect(() => {
    console.log(isInit);

    if (isInit.current) {
      isInit.current = false;
      return;
    }
  }, []);

  const options = businessData.business.Customer.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const handleSelectChange = (customerId: string | undefined) => {
    console.log("e", customerId);

    if (!customerId)
      return setAppointmentInput({ ...appointmentInput, customerId: null });

    setAppointmentInput({ ...appointmentInput, customerId: customerId });
  };
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 180, minWidth: 120 }}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => {
        return (
          <TextField
            error={!isInit.current && !!customerMissing}
            {...params}
            key={params.id}
            placeholder="Select Client"
            label={
              <p className="font-serif text-xl flex justify-center items-center gap-1">
                Client
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
};

export default ForWho;

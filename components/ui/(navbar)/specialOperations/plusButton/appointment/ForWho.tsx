"use client";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import TextField from "@mui/material/TextField";
import { Chip } from "@mui/material";
import { AppointmentInput, BusinessData } from "types/types";
import { TbCalendarTime } from "react-icons/tb";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ForWho = ({
  businessData,
  appointmentInput,
  setAppointmentInput,
}: {
  businessData: BusinessData;
  setAppointmentInput: React.Dispatch<React.SetStateAction<AppointmentInput>>;
  appointmentInput: AppointmentInput;
}) => {
  const options = businessData.business.Customer.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const handleSelectChange = (customerId: string | undefined) => {
    console.log("e", customerId);

    if (!customerId) return;

    setAppointmentInput({ ...appointmentInput, customerId: customerId });
  };
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
};

export default ForWho;

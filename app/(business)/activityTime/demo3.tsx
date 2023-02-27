"use client";
import * as React from "react";
import "./style.css";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { User } from "@prisma/client";

export default function Demo3({ user }: { user: User }) {
  const [startActivity, setStartActivity] = React.useState<Dayjs | null>(
    dayjs("2022-04-07T09:00:00")
  );
  const [endActivity, setEndActivity] = React.useState<Dayjs | null>(
    dayjs("2022-04-07T17:00:00")
  );

  return (
    <div className="md:w-full rounded-2xl bg-white/[0.8]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticTimePicker
          displayStaticWrapperAs="mobile"
          value={startActivity}
          onChange={(newValue) => {
            console.log(`${newValue?.format("hh:mm ")}`);

            setStartActivity(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Start Activity" />
          )}
        />
        <StaticTimePicker
          displayStaticWrapperAs="mobile"
          value={endActivity}
          onChange={(newValue) => {
            setEndActivity(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="End Activity"
              className="w-full md:w-auto"
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
}

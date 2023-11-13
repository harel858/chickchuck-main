import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { Appointment, AppointmentSlot, Treatment } from "@prisma/client";

function HistoryItem({
  appointment,
}: {
  appointment: Appointment & {
    treatment: Treatment;
    appointmentSlot: AppointmentSlot;
  };
}) {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Accordion
      expanded={expanded === `${appointment.id}`}
      onChange={handleChange(`${appointment.id}`)}
      key={appointment.id}
      className="w-full"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id={`${appointment.id}`}
      >
        <Typography
          sx={{ width: "33%", flexShrink: 0 }}
          className="text-xl font-semibold"
        >
          {appointment.treatment?.title}
        </Typography>
        <Typography
          sx={{ width: "33%", flexShrink: 0 }}
          className="text-xl font-semibold text-gray-500"
        >
          {appointment.appointmentSlot.date}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col justify-center items-center gap-2">
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-lg font-serif font-semibold">Start Time</p>
          <p className="text-lg font-semibold text-gray-500">
            {appointment.appointmentSlot.start}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-lg font-serif font-semibold">End Time</p>
          <p className="text-lg font-semibold  text-gray-500">
            {appointment.appointmentSlot.end}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-lg font-serif font-semibold">Income</p>
          <p className="text-lg font-semibold  text-gray-500">
            {appointment.treatment?.cost}$
          </p>
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-lg font-serif font-semibold">Rating</p>
          <Rating name="read-only" value={5} readOnly />
        </div>
        <div className="flex flex-row justify-center items-center w-full">
          <TextField
            id="standard-multiline-static"
            label="Appointment Note"
            multiline
            rows={4}
            defaultValue={appointment.notes || "Add An Note"}
            variant="filled"
            className="self-center w-full"
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default HistoryItem;

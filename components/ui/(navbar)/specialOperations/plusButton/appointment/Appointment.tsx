"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import dayjs from "dayjs";
import AvailableList from "./AvailableList";
import { Button } from "@ui/Button";
import { AppointmentInput, BusinessData } from "types/types";
import WithWho from "./WithWho";
import ForWhat from "./ForWhat";
import ForWho from "./ForWho";
import Errors from "./Errors";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Appointment({ businessData }: { businessData: BusinessData }) {
  const { usersData } = businessData;

  // Initialize the state with an object directly
  const [appointmentInput, setAppointmentInput] = useState<AppointmentInput>({
    treatment: null,
    availableSlot: [],
    user: usersData[0] && usersData.length == 1 ? usersData[0] : null,
    date: dayjs(),
    customerId: null,
  });
  const [treatmentMissing, setTreatmentMissing] = useState("");
  const [recipientMissing, setRecipientMissing] = useState("");
  const [customerMissing, setCustomerMissing] = useState("");
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSubmit = async () => {
    if (!appointmentInput.customerId)
      return setCustomerMissing("Client is missing");
    if (!appointmentInput.treatment)
      return setTreatmentMissing("Service is missing");
    if (!appointmentInput.user)
      return setRecipientMissing("Recipient is missing");

    setLoading(true);

    // Proceed only if both treatment and recipient are selected

    try {
      console.log("appointmentInput", appointmentInput);

      const res = await axios.post("api/appointments", {
        ...appointmentInput,
      });
      if (res.status == 200) {
        setLoading(false);
        setSuccessOpen(true);
      }
      // Do something with the response if needed
    } catch (err) {
      setLoading(false);
      setErrorOpen(true);
      console.log(err);
    }
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };
  const handleCloseErr = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="w-full"
    >
      <div className="max-md:w-full flex flex-col justify-start content-center items-center gap-5 p-5">
        <h2 className={`text-slate-900 font-normal font-serif text-2xl`}>
          Create An Appointment
        </h2>
        <div className="flex flex-col max-md:flex-col justify-center items-center gap-5">
          <ForWho
            customerMissing={customerMissing}
            businessData={businessData}
            setAppointmentInput={setAppointmentInput}
            appointmentInput={appointmentInput}
          />
          {usersData.length > 1 ? (
            <WithWho
              userData={usersData}
              setAppointmentInput={setAppointmentInput}
              appointmentInput={appointmentInput}
              recipientMissing={recipientMissing}
            />
          ) : (
            <></>
          )}
          <ForWhat
            setAppointmentInput={setAppointmentInput}
            appointmentInput={appointmentInput}
            treatmentMissing={treatmentMissing}
          />
        </div>
        <AvailableList
          appointmentInput={appointmentInput}
          setAppointmentInput={setAppointmentInput}
          businessActivityDays={businessData.business.activityDays}
          usersData={usersData}
          setCustomerMissing={setCustomerMissing}
          setTreatmentMissing={setTreatmentMissing}
          setRecipientMissing={setRecipientMissing}
        />
        <Errors
          customerMissing={customerMissing}
          recipientMissing={recipientMissing}
          treatmentMissing={treatmentMissing}
        />
        <Button
          variant="default"
          className="w-max  bg-sky-600 hover:bg-slate-900 dark:bg-sky-800 text-xl rounded-xl max-2xl:w-11/12 tracking-widest"
          disabled={
            appointmentInput.availableSlot.length === 0 ||
            !appointmentInput.customerId ||
            !appointmentInput.treatment?.id ||
            !appointmentInput.user?.userId
          }
          onClick={handleSubmit}
          isLoading={loading}
        >
          Book Now
        </Button>
        <Snackbar
          open={successOpen}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            This is a success message!
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorOpen}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={handleCloseErr}
        >
          <Alert
            onClose={handleCloseErr}
            severity="error"
            sx={{ width: "100%" }}
          >
            This is an error message!
          </Alert>
        </Snackbar>
      </div>
    </motion.div>
  );
}

export default Appointment;

import React, { useCallback, useState } from "react";
import DisplayInput from "./DisplayInput";
import { motion } from "framer-motion";
import { Button } from "@ui/Button";
import { Alert, Snackbar } from "@mui/material";
import { ErrorData, ServiceFormKeys } from "types/types";
import axios, { AxiosError } from "axios";

type ServiceFormData = Record<ServiceFormKeys, string>;

const initialServiceFormData: ServiceFormData = {
  title: "",
  cost: "",
  duration: "",
  "document Name": "",
};
const initialErrorData: ErrorData = {
  title: false,
  cost: false,
  duration: false,
  "document Name": false,
};

function Form({ businessId }: { businessId: string }) {
  console.log(businessId);

  const [serviceFormData, setServiceFormData] = useState<ServiceFormData>(
    initialServiceFormData
  );
  const [errors, setErrors] = useState<ErrorData>(initialErrorData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    let newErrors = { ...initialErrorData }; // Create a new errors object based on initialErrorData

    for (let key in serviceFormData) {
      if (serviceFormData[key as keyof ServiceFormData] === "") {
        newErrors = { ...newErrors, [key]: true };
      } else if (serviceFormData[key as keyof ServiceFormData] !== "") {
        newErrors = { ...newErrors, [key]: false };
      }
    }

    setErrors(newErrors);
    // Commented out for now, uncomment when you want to make the API call

    try {
      const res = await axios.post(`/api/treatment`, {
        ...serviceFormData,
        advancePayment: 0,
        documentName: serviceFormData["document Name"],
        businessId: businessId,
      });
      console.log(res.data);
      setLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.message);
      }
      console.error(err);
      setLoading(false);
    }
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // Regular expression to allow only positive numbers
      const positiveNumberRegex = /^[0-9]+$/;

      const { name, value } = event.target;

      if (name === "duration" && !isNaN(+value) && +value % 5 !== 0) {
        // Ensure the value is a multiple of 5
        let newValue = Math.round(+value / 5) * 5; // Round to the nearest multiple of 5
        event.target.value = newValue.toString();
      }

      setServiceFormData({
        ...serviceFormData,
        [name]: value,
      });
    },
    [serviceFormData, setServiceFormData]
  );

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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center mt-4 w-full relative"
      >
        <h2 className={`text-slate-900 font-normal font-serif text-2xl`}>
          Create A Service
        </h2>
        <DisplayInput
          data={["title", "cost", "duration", "document Name"]}
          handleChange={handleChange}
          errors={errors}
          serviceFormData={serviceFormData}
        />
        <Button
          variant="default"
          className="w-max bg-sky-600 hover:bg-slate-900 dark:bg-sky-800 text-xl rounded-xl max-2xl:w-11/12 tracking-widest"
          isLoading={loading}
          type="submit"
        >
          Create
        </Button>
      </form>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </motion.div>
  );
}
2;

export default Form;

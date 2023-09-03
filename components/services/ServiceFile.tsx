import React, { useCallback, useState } from "react";
import DisplayInput from "./Form/DisplayInput";
import { motion } from "framer-motion";
import { Button } from "@ui/Button";
import { Alert, Snackbar } from "@mui/material";
import { ErrorData, ServiceFormData } from "types/types";
import { RequiredDocument, Treatment } from "@prisma/client";
import AdvanceFeatures from "./Form/AdvanceFeatures";
import { updateService } from "actions/editService";
import { SelectChangeEvent } from "@mui/material/Select";

const initialErrorData: ErrorData = {
  title: false,
  cost: false,
  duration: false,
  "advance Payment": false,
  "document Name": false,
};

function Form({
  treatment,
  bussinesDocs,
}: {
  treatment: Treatment & {
    RequiredDocument: RequiredDocument[];
  };
  bussinesDocs: RequiredDocument[];
}) {
  const [serviceFormData, setServiceFormData] = useState<ServiceFormData>({
    title: treatment.title,
    cost: +treatment.cost!,
    duration: +treatment.duration!,
    "document Name": treatment.RequiredDocument || [],
    "advance Payment": "",
  });
  console.log("serviceFormData", serviceFormData);

  const [errors, setErrors] = useState<ErrorData>(initialErrorData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { cost, duration, title, ...rest } = serviceFormData;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | RequiredDocument[]
    ) => {
      if (Array.isArray(event)) {
        return setServiceFormData({
          ...serviceFormData,
          ["document Name"]: event,
        });
      }
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
        action={(e) => updateService(e, treatment.id)}
        className="flex flex-col items-center mt-4 w-full relative"
      >
        <h2 className={`text-slate-900 font-normal font-serif text-2xl`}>
          Edit Service Details
        </h2>
        <div className="flex flex-row flex-wrap justify-center items-center gap-4 mt-4 w-10/12 max-2xl:w-full pb-5">
          <DisplayInput
            data={["title", "cost", "duration"]}
            handleChange={handleChange}
            errors={errors}
            serviceFormData={serviceFormData}
          />
          <AdvanceFeatures
            initOpen="panel1"
            handleChange={handleChange}
            errors={errors}
            serviceFormData={serviceFormData}
            treatmentDocs={treatment.RequiredDocument}
            bussinesDocs={bussinesDocs}
          />
        </div>
        <Button
          variant="default"
          className="w-max bg-sky-600 hover:bg-slate-900 dark:bg-sky-800 text-xl rounded-xl max-2xl:w-11/12 tracking-widest"
          isLoading={loading}
          type="submit"
        >
          Edit
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

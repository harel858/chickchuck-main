import React, { useCallback, useState } from "react";
import DisplayInput from "./DisplayInput";
import AdvanceFeatures from "./AdvanceFeatures";
import { motion } from "framer-motion";
import { Button } from "@ui/Button";
import { Alert, Snackbar } from "@mui/material";
import { ErrorData, ServiceFormData, ServiceFormKeys } from "types/types";
import { SelectChangeEvent } from "@mui/material/Select";
import axios, { AxiosError } from "axios";
import { RequiredDocument } from "@prisma/client";
import { revalidatePath } from "next/cache";

const initialServiceFormData = {
  title: "",
  cost: 0,
  duration: 0,
  "advance Payment": 0,
  "document Name": [],
};
const initialErrorData: ErrorData = {
  title: false,
  cost: false,
  duration: false,
  "advance Payment": false,
  "document Name": false,
};

function Form({
  businessId,
  bussinesDocs,
  treatmentDocs,
  closeDialog,
  successMessage,
}: {
  businessId: string;
  treatmentDocs?: RequiredDocument[];
  bussinesDocs: RequiredDocument[];
  successMessage: () => void;
  closeDialog: () => void;
}) {
  console.log("bussinesDocs", bussinesDocs);

  const [serviceFormData, setServiceFormData] = useState<ServiceFormData>({
    ...initialServiceFormData,
    "document Name": bussinesDocs || [],
  });
  const [errors, setErrors] = useState<ErrorData>(initialErrorData);
  const [loading, setLoading] = useState(false);

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
      console.log("serviceFormData", serviceFormData["document Name"]);

      const res = await axios.post(`/api/treatment`, {
        ...serviceFormData,
        advancePayment: serviceFormData["advance Payment"],
        documentName: serviceFormData["document Name"],
        businessId: businessId,
      });
      if (res.status === 201) {
        successMessage();
        setLoading(false);
        return closeDialog();
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.message);
      }
      console.error(err);
      setLoading(false);
    }
  };

  const handleChange = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | RequiredDocument[]
    ) => {
      // Regular expression to allow only positive numbers
      if (Array.isArray(event)) {
        return setServiceFormData({
          ...serviceFormData,
          ["document Name"]: event,
        });
      }
      const {
        target: { value, name },
      } = event;
      console.log("value", value);

      if (name === "duration" && !isNaN(+value) && +value % 5 !== 0) {
        // Ensure the value is a multiple of 5
        let newValue = Math.round(+value / 5) * 5; // Round to the nearest multiple of 5
        event.target.value = newValue.toString();
      }

      setServiceFormData({
        ...serviceFormData,
        [name]: isNaN(+value) ? value : +value,
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
        <div className="flex flex-row flex-wrap justify-center items-center gap-4 mt-4 w-10/12 max-2xl:w-full pb-5">
          <DisplayInput
            data={["title", "cost", "duration"]}
            handleChange={handleChange}
            errors={errors}
            serviceFormData={serviceFormData}
          />
          <AdvanceFeatures
            handleChange={handleChange}
            errors={errors}
            serviceFormData={serviceFormData}
            treatmentDocs={treatmentDocs}
            bussinesDocs={bussinesDocs}
          />
        </div>
        <Button
          variant="default"
          className="w-max bg-sky-600 hover:bg-slate-900 dark:bg-sky-800 text-xl rounded-xl max-2xl:w-11/12 tracking-widest"
          isLoading={loading}
          type="submit"
        >
          Create
        </Button>
      </form>
    </motion.div>
  );
}

export default Form;

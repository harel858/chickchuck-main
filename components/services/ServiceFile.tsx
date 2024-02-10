import React, { useCallback, useState, useTransition } from "react";
import DisplayInput from "./Form/DisplayInput";
import { motion } from "framer-motion";
import { Button } from "@ui/Button";
import { ErrorData, ServiceFormData } from "types/types";
import { RequiredDocument, Treatment } from "@prisma/client";
import AdvanceFeatures from "./Form/AdvanceFeatures";
import { updateService } from "actions/editService";

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
  handleClose,
  successMessage,
}: {
  treatment: Treatment & {
    RequiredDocument?: RequiredDocument[];
  };
  bussinesDocs?: RequiredDocument[];
  handleClose: () => void;
  successMessage: () => void;
}) {
  const initialServiceFormData = {
    title: treatment.title,
    cost: +treatment.cost!,
    duration: +treatment.duration!,
    "document Name": treatment.RequiredDocument || [],
    "advance Payment": treatment.advancePayment || 0,
  };
  const [serviceFormData, setServiceFormData] = useState<ServiceFormData>(
    initialServiceFormData
  );

  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<ErrorData>(initialErrorData);
  const { cost, duration, title, ...rest } = serviceFormData;
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
        return setServiceFormData({
          ...serviceFormData,
          [name]: newValue,
        });
      }

      setServiceFormData({
        ...serviceFormData,
        [name]: isNaN(+value) ? value : +value,
      });
    },
    [serviceFormData, setServiceFormData]
  );
  const hasChanges =
    JSON.stringify(serviceFormData) !== JSON.stringify(initialServiceFormData);

  return (
    <>
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
          action={(e) => {
            startTransition(() =>
              updateService(
                e,
                serviceFormData["document Name"] as RequiredDocument[],
                treatment.id
              )
            );
            handleClose();
            successMessage();
          }}
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
            isLoading={isPending}
            disabled={!hasChanges}
            type="submit"
          >
            Edit Service
          </Button>
        </form>
      </motion.div>
    </>
  );
}

export default Form;

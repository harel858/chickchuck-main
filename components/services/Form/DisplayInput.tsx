import React, { ReactNode } from "react";
import TextField from "@mui/material/TextField";
import DocsOptions from "./DocsOptions";
import { ErrorData, ServiceFormData, ServiceFormKeys } from "types/types";
import { MdTitle, MdOutlinePriceChange } from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
import { SlDocs } from "react-icons/sl";
import { RiSecurePaymentFill } from "react-icons/ri";
import { InputAdornment } from "@mui/material";
import { RequiredDocument } from "@prisma/client";
import { SelectChangeEvent } from "@mui/material/Select";

const inputIcons: Record<ServiceFormKeys, ReactNode> = {
  title: <MdTitle className="text-2xl" />,
  cost: <MdOutlinePriceChange className="text-2xl" />,
  duration: <CgSandClock className="text-2xl" />,
  "document Name": <SlDocs className="text-2xl " />,
  "advance Payment": <RiSecurePaymentFill className="text-2xl " />,
};

function DisplayInput({
  data,
  handleChange,
  errors,
  serviceFormData,
  bussinesDocs,
  treatmentDocs,
}: {
  data: ServiceFormKeys[];
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | RequiredDocument[]
  ) => void;
  errors: ErrorData;
  serviceFormData: ServiceFormData;
  treatmentDocs?: RequiredDocument[];
  bussinesDocs?: RequiredDocument[];
}) {
  return (
    <>
      {data.map((item) => {
        if (item === "document Name" && bussinesDocs)
          return (
            <DocsOptions
              key={item}
              name={item}
              onChange={handleChange}
              treatmentDocs={treatmentDocs}
              bussinesDocs={bussinesDocs}
            />
          );
        return (
          <TextField
            key={item}
            id="outlined-basic"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {inputIcons[item as keyof typeof inputIcons]}
                </InputAdornment>
              ),
              style: { color: "black", fontSize: "1.2em" },
              inputMode: "numeric",
            }}
            variant={item == "advance Payment" ? "filled" : "standard"}
            label={
              item === "cost"
                ? "Price"
                : item.charAt(0).toUpperCase() + item.slice(1, item.length)
            }
            name={item}
            color={"primary"}
            value={serviceFormData[item]}
            disabled={item === "advance Payment" && !serviceFormData.cost}
            required={item !== "advance Payment"}
            type={
              item === "duration" ||
              item === "advance Payment" ||
              item === "cost"
                ? "number"
                : "text"
            }
            inputProps={
              item === "duration"
                ? {
                    step: "5",
                    pattern: "/^e-[0-9]+$/",
                    min: 0,
                    style: {
                      color: "black",
                      fontSize: "1.2em",
                    },
                  }
                : item === "cost"
                ? {
                    inputMode: "numeric",
                    pattern: "/^[0-9]+$/",
                    min: 0,
                    style: { color: "black", fontSize: "1.2em" },
                  }
                : item === "advance Payment"
                ? {
                    inputMode: "numeric",
                    pattern: "/^[0-9]+$/",
                    min: 0,
                    max: serviceFormData["cost"] || 0,
                    style: { fontSize: "1.2em" },
                  }
                : {
                    inputMode: "text",
                    style: {
                      fontSize: "1.2em",
                    },
                  }
            }
            onChange={handleChange}
            error={errors[item]}
            helperText={errors[item] ? "Field is required" : ""}
            InputLabelProps={{
              style: {
                fontSize: "1.5em",
                fontWeight: "500",
              },
            }}
            sx={{
              width: "100%",
              borderRadius: "4px",
              ":after": { border: "4px solid white" },
            }}
          />
        );
      })}
    </>
  );
}

export default DisplayInput;

import React from "react";
import { ErrorData, ServiceFormKeys } from "types/types";
import TextField from "@mui/material/TextField";

function DisplayInput({
  data,
  handleChange,
  errors,
}: {
  data: ServiceFormKeys[];
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errors: ErrorData;
}) {
  return (
    <div className="flex flex-col items-center gap-4 mt-4 w-10/12 max-2xl:w-full pb-5">
      {data.map((item) => (
        <div key={item}>
          <TextField
            id="outlined-basic"
            label={item.charAt(0).toUpperCase() + item.slice(1, item.length)}
            name={item}
            type={item !== "title" ? "number" : "text"}
            inputProps={
              item === "duration"
                ? {
                    step: "5",
                    pattern: "/^e-[0-9]+$/",
                    min: 0,
                    style: { color: "black", fontSize: "1.2em" },
                  }
                : item === "cost"
                ? {
                    inputMode: "numeric",
                    pattern: "/^[0-9]+$/",
                    min: 0,
                    style: { color: "black", fontSize: "1.2em" },
                  }
                : {
                    inputMode: "text",
                    style: { color: "black", fontSize: "1.2em" },
                  }
            } // Set step attribute for "duration"
            onChange={handleChange}
            error={errors[item]}
            helperText={errors[item] ? "Field is required" : ""}
            variant="filled"
            InputProps={{
              style: { color: "black", fontSize: "1.2em" },
              inputMode: "numeric",
            }}
            InputLabelProps={{
              style: {
                fontSize: "1.1em",
                fontWeight: "500",
                color: "black",
              },
            }}
            sx={{
              width: "100%",
              borderRadius: "4px",
              ":after": { border: "4px solid white" },
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default DisplayInput;

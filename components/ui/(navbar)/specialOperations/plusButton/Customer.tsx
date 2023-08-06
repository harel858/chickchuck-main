import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { TextField } from "@mui/material";
import { Button } from "@ui/Button";
import axios, { AxiosError } from "axios";

interface InputData {
  name: string;
  phoneNumber: string;
}
function Customer() {
  const [input, setInput] = useState<InputData>({
    name: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: [value] }));
  };

  const submitForm = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setError("");
      setLoading(true);
      if (!input.name || !input.phoneNumber) {
        setLoading(false);
        return setError("missing values");
      }
      try {
        const res = await axios.post("/api/verification/stepone", input);

        if (res.status === 200) {
          const data = res.data;
          setInput((prevInput) => ({
            ...prevInput,
            request_id: data.request_id,
          }));
          setLoading(false);
        }
      } catch (err: any) {
        console.log(err);
        if (err instanceof AxiosError) {
          console.log(err.message);
          setError(err.message);
        }
        console.log(err);
        setLoading(false);
      }
    },
    [input]
  );

  return (
    <form className="flex flex-col items-center gap-4 mt-4 w-full relative">
      <div className="flex flex-col items-center gap-4 mt-4 w-10/12 max-2xl:w-full pb-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="w-full"
        >
          <TextField
            id="outlined-basic"
            label="Enter Name"
            name="name"
            onChange={handleChange}
            error={Boolean(error)}
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
              ...(error && { boxShadow: "0px 0px 0px 2px red" }),
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="w-full"
        >
          <TextField
            id="outlined-basic"
            label="Phone Number"
            name="phoneNumber"
            variant="filled"
            onChange={handleChange}
            error={Boolean(error)}
            InputProps={{
              style: {
                color: "black",
                fontSize: "1.2em",
              },
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
              ...(error && { boxShadow: "0px 0px 0px 2px red" }),
            }}
          />
        </motion.div>
      </div>
      <p className="text-red-500">{error}</p>

      {/* Rest of the code for text fields */}
      <Button
        variant="default"
        className="w-1/2 bg-sky-600 hover:bg-slate-900 dark:bg-sky-800 text-xl rounded-xl max-2xl:w-11/12 tracking-widest"
        isLoading={loading}
        onClick={submitForm}
      >
        Create
      </Button>
    </form>
  );
}

export default Customer;

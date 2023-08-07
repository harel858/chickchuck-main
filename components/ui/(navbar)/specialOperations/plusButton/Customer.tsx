import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { TextField } from "@mui/material";
import { Button } from "@ui/Button";
import axios, { AxiosError } from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface InputData {
  name: string;
  phoneNumber: number | null;
}
function Customer() {
  const [input, setInput] = useState<InputData>({
    name: "",
    phoneNumber: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(input);

    // Validate and ensure only numeric characters are entered
    if (name === "phoneNumber" && !/^\d*$/.test(value)) {
      return; // Don't update the state if non-numeric characters are entered
    }

    setInput((prev) => ({ ...prev, [name]: value }));
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
        const res = await axios.post("/api/customers/create", input);

        if (res.status === 200) {
          setLoading(false);
          setOpen(true);
          return;
        }
      } catch (err: any) {
        console.log(err);

        if (err instanceof AxiosError) {
          if (err.response?.status === 409 || err.response?.status === 400) {
            setError(err.response.data);
            setLoading(false);
            return;
          }
        }
        setLoading(false);
        return;
      }
    },
    [input]
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
      <form className="flex flex-col items-center gap-4 mt-4 w-full relative">
        <div className="flex flex-col items-center gap-4 mt-4 w-10/12 max-2xl:w-full pb-5">
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
        </div>
        <p className="text-red-500">{error}</p>

        <Button
          variant="default"
          className="w-1/2 bg-sky-600 hover:bg-slate-900 dark:bg-sky-800 text-xl rounded-xl max-2xl:w-11/12 tracking-widest"
          isLoading={loading}
          onClick={submitForm}
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

export default Customer;

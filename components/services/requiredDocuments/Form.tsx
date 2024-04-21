import React, { useState, useTransition } from "react";
import { TextField } from "@mui/material";
import { Button } from "@ui/Button";
import { addDocs } from "actions/addNewDocs";

function Form({
  successMessage,
  businessId,
  handleClose,
}: {
  businessId: string;
  handleClose: () => void;
  successMessage: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState(false);
  const onchange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setValue(e.target.value);

  return (
    <form
      action={(e) => {
        startTransition(() => addDocs(e, businessId));
        successMessage();
        handleClose();
      }}
      className="flex flex-col justify-center items-center gap-4"
    >
      <TextField
        label={"Add New Required Docs"}
        InputLabelProps={{ size: "normal", color: "primary" }}
        variant="filled"
        color="primary"
        error={error}
        value={value}
        name="name"
        onChange={onchange}
      />
      <Button
        isLoading={isPending}
        className="rounded-full bg-blue-600 text-white text-xl font-medium"
      >
        Add +
      </Button>
    </form>
  );
}

export default Form;

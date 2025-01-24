"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  React.useEffect(() => console.log(error), [error]);
  return (
    <Stack sx={{ width: "100%" }}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
        <button
          onClick={() => reset()}
          className="p-2 bg-red-500 hover:bg-red-200"
        >
          reset error boundary
        </button>
      </Alert>
    </Stack>
  );
}

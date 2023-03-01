import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import { User } from "@prisma/client";
import { AvailableSlot } from "../../../types";

type SubmitProps = {
  user: User;
  hasChanges: boolean;
  startActivity: Dayjs;
  endActivity: Dayjs;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  activityDays: any[];
  availableSlots: AvailableSlot[];
};

export default function SubmitButton({
  user,
  hasChanges,
  startActivity,
  endActivity,
  setHasChanges,
  activityDays,
  availableSlots,
}: SubmitProps) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    console.log(hasChanges);

    return () => {
      clearTimeout(timer.current);
    };
  }, [hasChanges]);

  const handleButtonClick = async () => {
    console.log(activityDays);

    setSuccess(false);
    setLoading(true);
    try {
      const res = await fetch(`/api/slots/slot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startActivity: startActivity.format("hh:mm A"),
          endActivity: endActivity.format("hh:mm A"),
          activityDays,
          availableSlots,
          id: user.id,
        }),
      });
      const response = await res.json();
      console.log(response);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ m: 1, position: "relative" }}>
        <Fab
          aria-label="save"
          color="warning"
          sx={buttonSx}
          disabled={hasChanges}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Box sx={{ m: 1, position: "relative" }}>
        <Button
          variant="contained"
          color="warning"
          sx={buttonSx}
          disabled={loading || hasChanges}
          onClick={handleButtonClick}
        >
          Accept terms
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
    </Box>
  );
}

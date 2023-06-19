import React from "react";
import { User } from "@prisma/client";
import { Slots } from "../../../../../types/types";
import axios from "axios";
import { Button } from "@ui/Button";
import { Dayjs } from "dayjs";

type SubmitProps = {
  user: User;
  hasChanges: boolean;
  startActivity: Dayjs;
  endActivity: Dayjs;
  activityDays: any[];
  availableSlots: Slots[];
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export default function SubmitButton({
  user,
  hasChanges,
  startActivity,
  endActivity,
  activityDays,
  availableSlots,
  setError,
}: SubmitProps) {
  console.log(hasChanges);

  const [loading, setLoading] = React.useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`/api/bussiness/activity`, {
        startActivity: startActivity.toISOString(),
        endActivity: endActivity.toISOString(),
        activityDays,
        availableSlots,
        userId: user.id,
        duration: 5,
      });
      console.log(res.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Button
      disabled={hasChanges || endActivity?.hour() < startActivity.hour()}
      onClick={handleButtonClick}
      isLoading={loading}
    >
      Save Changes
    </Button>
  );
}

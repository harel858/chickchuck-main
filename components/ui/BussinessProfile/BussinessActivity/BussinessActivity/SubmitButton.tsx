import React from "react";
import { User } from "@prisma/client";
import { Slots } from "../../../../../types/types";
import axios, { AxiosError } from "axios";
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
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SubmitButton({
  user,
  hasChanges,
  startActivity,
  endActivity,
  activityDays,
  availableSlots,
  setError,
  setHasChanges,
}: SubmitProps) {
  console.log(hasChanges);

  const [loading, setLoading] = React.useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    setError("");
    const params = {
      startActivity: startActivity.toISOString(),
      endActivity: endActivity.toISOString(),
      activityDays,
      availableSlots,
      userId: user.id,
      duration: 5,
    };
    console.log(params);

    try {
      const res = await axios.post(`/api/business/activity`, params);
      console.log(res.data);

      setLoading(false);
      setHasChanges(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.message);
        setLoading(false);
        return;
      }
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

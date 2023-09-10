import React from "react";
import axios, { AxiosError } from "axios";
import { Button } from "@ui/Button";
import { Dayjs } from "dayjs";
import { User } from "@prisma/client";
import { Slots } from "types/types";

type SubmitProps = {
  user: User;
  hasChanges: boolean;
  startActivity: Dayjs | null;
  endActivity: Dayjs | null;
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
  const [loading, setLoading] = React.useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    setError("");
    const params = {
      startActivity: startActivity?.toISOString(),
      endActivity: endActivity?.toISOString(),
      activityDays,
      availableSlots,
      userId: user.id,
    };

    try {
      const res = await axios.post(`/api/user/activity`, params);
      console.log(params);
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
      disabled={
        hasChanges ||
        !startActivity ||
        !endActivity ||
        endActivity.hour() <= startActivity.hour()
      }
      className={"bg-blue-600 text-white hover:bg-blue-500"}
      onClick={handleButtonClick}
      isLoading={loading}
    >
      Save Changes
    </Button>
  );
}

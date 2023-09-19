import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Button } from "@ui/Button";
import { Dayjs } from "dayjs";
import { BreakTime, User } from "@prisma/client";
import { Slots } from "types/types";

type SubmitProps = {
  user: User;
  hasChanges: boolean;
  startActivity: Dayjs | null;
  endActivity: Dayjs | null;
  activityDays: number[];
  availableSlots: Slots[];
  breaks: BreakTime[];
  setError: React.Dispatch<React.SetStateAction<string>>;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SubmitButton({
  user,
  hasChanges,
  startActivity,
  endActivity,
  activityDays,
  availableSlots,
  breaks,
  setError,
  setHasChanges,
  setModalOpen,
}: SubmitProps) {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    setError("");

    const params = {
      startActivity: startActivity?.toISOString(),
      endActivity: endActivity?.toISOString(),
      activityDays,
      breaks: breaks.map((item) => item.id),
      availableSlots,
      userId: user.id,
    };

    try {
      const res = await axios.post(`/api/user/activity`, params);
      console.log(params);
      console.log(res.data);

      setLoading(false);
      setHasChanges(true);
      setModalOpen(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.message);
      } else {
        console.log(err);
      }
      setLoading(false);
    }
  };

  const isButtonDisabled =
    hasChanges ||
    !startActivity ||
    !endActivity ||
    endActivity.hour() <= startActivity.hour();

  return (
    <Button
      disabled={isButtonDisabled}
      className={"bg-blue-600 text-white hover:bg-blue-500"}
      onClick={handleButtonClick}
      isLoading={loading}
    >
      Save Changes
    </Button>
  );
}

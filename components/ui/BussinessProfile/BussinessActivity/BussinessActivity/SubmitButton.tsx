import React from "react";
import { ProfilePageData, Slots } from "../../../../../types/types";
import axios, { AxiosError } from "axios";
import { Button } from "@ui/Button";
import { Dayjs } from "dayjs";

type SubmitProps = {
  user: ProfilePageData;
  hasChanges: boolean;
  startActivity: Dayjs | null;
  endActivity: Dayjs | null;
  activityDays: any[];
  setError: React.Dispatch<React.SetStateAction<string>>;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SubmitButton({
  user,
  hasChanges,
  startActivity,
  endActivity,
  activityDays,
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
      userId: user.id,
      duration: 5,
    };

    try {
      const res = await axios.post(`/api/business/activity`, params);

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
      variant={"destructive"}
      disabled={
        hasChanges ||
        !startActivity ||
        !endActivity ||
        endActivity.hour() <= startActivity.hour()
      }
      onClick={handleButtonClick}
      isLoading={loading}
    >
      Save Changes
    </Button>
  );
}

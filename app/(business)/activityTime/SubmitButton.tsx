import React from "react";
import { User } from "@prisma/client";
import { Slots } from "../../../types/types";
import axios from "axios";
import { Button } from "@ui/Button";
import { Dayjs } from "dayjs";

type SubmitProps = {
  user: User;
  hasChanges: boolean;
  startActivity: Dayjs;
  endActivity: Dayjs;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  activityDays: any[];
  availableSlots: Slots[];
};

export default function SubmitButton({
  user,
  hasChanges,
  startActivity,
  endActivity,
  activityDays,
  availableSlots,
}: SubmitProps) {
  const [loading, setLoading] = React.useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    console.log(startActivity.toISOString());

    try {
      const res = await axios.post(`/api/slots/slot`, {
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
      disabled={hasChanges}
      onClick={handleButtonClick}
      isLoading={loading}
    >
      Save Changes
    </Button>
  );
}

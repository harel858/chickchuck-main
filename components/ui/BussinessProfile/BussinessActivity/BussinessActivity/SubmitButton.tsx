import React from "react";
import { ProfilePageData, Slots } from "../../../../../types/types";
import axios, { AxiosError } from "axios";
import { Button } from "@ui/Button";
import { Dayjs } from "dayjs";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

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

  const [api, contextHolder] = notification.useNotification();
  const successNotification = (placement: NotificationPlacement) => {
    api.success({
      message: `Notification ${placement}`,
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement,
    });
  };

  const errorNotification = (placement: NotificationPlacement) => {
    api.error({
      message: `Notification ${placement}`,
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement,
    });
  };
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

      if (res.status === 200) {
        setLoading(false);
        setHasChanges(true);
        return successNotification("bottom");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.message);
        setLoading(false);
        return errorNotification("bottom");
      }
      console.log(err);
      setLoading(false);
      return errorNotification("bottom");
    }
  };

  return (
    <>
      {contextHolder}
      <Button
        variant={"default"}
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
    </>
  );
}

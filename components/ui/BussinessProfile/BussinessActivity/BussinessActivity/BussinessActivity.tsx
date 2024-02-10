/* import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ProfilePageData, Slots } from "../../../../../types/types";
import ActivityDays from "./ActivityDays";
import ActivityTimePicker from "./ActivityTimePicker";
import SubmitButton from "./SubmitButton";
import { GiSandsOfTime } from "react-icons/gi";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

export default function BusinessActivity({ user }: { user: ProfilePageData }) {
  const [error, setError] = useState<string>("");
  const [startActivity, setStartActivity] = useState<Dayjs>(
    dayjs(user.business.openingTime)
  );

  const [endActivity, setEndActivity] = useState<Dayjs>(
    dayjs(user.business.closingTime)
  );
  const [hasChanges, setHasChanges] = useState<boolean>(true);
  const [activityDays, setActivityDays] = useState<number[]>(
    user.business.activityDays
  );

  return (
    <div className="flex flex-col items-center relative max-sm:w-11/12 min-w-max dark:bg-orange-400/70 bg-slate-100 shadow-sm shadow-black p-5 rounded-xl gap-1 transition-all duration-300 ease-in-out border border-gray-500">
      <div className="text-black flex justify-center items-center gap-2">
        <h2 className="text-2xl font-bold text-center w-max">
          Business Activity
        </h2>
        <GiSandsOfTime className="text-3xl font-semibold" />
      </div>
      <br />
      <div className="flex flex-col justify-center items-center gap-5">
        <ActivityDays
          activityDays={activityDays}
          setActivityDays={setActivityDays}
          setHasChanges={setHasChanges}
        />
        <ActivityTimePicker
          error={error}
          setHasChanges={setHasChanges}
          startActivity={startActivity}
          setStartActivity={setStartActivity}
          endActivity={endActivity}
          setEndActivity={setEndActivity}
          setError={setError}
        />
      </div>
      <br />
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="font-serif text-red-500">{error}</p>
        <SubmitButton
          user={user}
          startActivity={startActivity}
          endActivity={endActivity}
          hasChanges={hasChanges}
          activityDays={activityDays}
          setError={setError}
          setHasChanges={setHasChanges}
        />
      </div>
    </div>
  );
}
 */
export {};

import React, { useEffect, useState, useTransition } from "react";
import { AvailableSlot } from "@prisma/client";
import { getQueuesByDate } from "actions/getSlots";
import dayjs from "dayjs";
import { ScheduleProps } from "types/types";
import { InputNumber, TimePicker } from "antd";
import { Button } from "@ui/Button";
import { ClockCircleOutlined } from "@ant-design/icons";
import { createCustomBreak } from "actions/customBreak";

function CustomBreak({ props }: { props: any }) {
  const scheduleprops = props?.scheduleprops as ScheduleProps;
  const businessId = scheduleprops.business.id;
  const date = dayjs(props?.record?.date).toISOString();
  const userId = props.userid;
  const time = props.record.key;
  const [duration, setDuration] = useState<number>(0);
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setError("");
    const getData = async (date: string, userId: string, duration: number) => {
      try {
        const res = await getQueuesByDate(userId, date, duration, time);
        console.log("res", res);
        if (res) return setSlots(res);
        setError("Apparently the break overruns an existing queue");
      } catch (err) {
        console.log(err);
        return;
      }
    };
    getData(date, userId, duration);
  }, [duration]);
  const handleInputChange = (e: number | null) => {
    if (e && e % 5 == 0) {
      setDuration(e);
    }
    return;
  };
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <InputNumber
        min={0}
        step={5}
        size={"large"}
        value={duration}
        onChange={handleInputChange}
        style={{ width: "100%" }}
        prefix={<ClockCircleOutlined />}
      />
      <p className="text-red-500 text-lg">{error}</p>
      <Button
        isLoading={isPending}
        disabled={!!error || slots.length === 0}
        onClick={() =>
          startTransition(() =>
            createCustomBreak({ businessId, date, slots, userId })
          )
        }
        className="rounded-full bg-blue-600 text-white text-xl font-medium"
      >
        Add +
      </Button>
    </div>
  );
}

export default CustomBreak;

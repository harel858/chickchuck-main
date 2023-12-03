import React, { useState, useTransition } from "react";
import { Button } from "@ui/Button";
import { addBreak } from "actions/break";
import { NotificationPlacement } from "antd/es/notification/interface";
import { TimePicker } from "antd";
import { RangeValue } from "rc-picker/lib/interface";
import dayjs from "dayjs";

const { RangePicker } = TimePicker;

function Form({
  successNotification,
  businessId,
}: {
  businessId: string;
  successNotification: (placement: NotificationPlacement) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<RangeValue<dayjs.Dayjs> | null>(null);
  const [error, setError] = useState(false);

  const onOk = (e: RangeValue<dayjs.Dayjs>) => {
    console.log(value?.[0]?.format("HH:mm"));

    setValue(e);
  };
  return (
    <form
      action={() => {
        const start = dayjs(value?.[0]).format("HH:mm");
        const end = dayjs(value?.[1]).format("HH:mm");
        if (!start || !end) return;
        startTransition(async () => {
          const res = await addBreak(start, end, businessId);
          console.log(res);
          if (res) {
            successNotification("bottom");
          }
        });
      }}
      className="flex flex-col justify-center items-center gap-4"
    >
      <RangePicker
        name="RangePicker"
        format="HH:mm"
        value={value}
        onOk={onOk}
        mode={["time", "time"]}
      />
      <Button
        isLoading={isPending}
        className="rounded-full bg-blue-600 text-white text-xl font-medium"
      >
        Add +
      </Button>
    </form>
  );
}

export default Form;

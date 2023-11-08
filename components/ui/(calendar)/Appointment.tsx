import React, { useEffect, useState, useTransition } from "react";
import { getQueuesByDate } from "actions/getSlots";
import dayjs from "dayjs";
import { message, Steps, theme } from "antd";
import { Button } from "@ui/Button";
import { ScheduleProps } from "types/types";
import SelectUser from "./SelectUser";
import SelectService from "./SelectService";
import { AvailableSlot } from "@prisma/client";
import { createAppointment } from "actions/createAppointment";

function Appointment({ props }: { props: any }) {
  const scheduleprops = props?.scheduleprops as ScheduleProps;
  const date = dayjs(props?.record?.date).toISOString();
  const userId = props.userid;
  const time = props.record.key;
  const [isPending, startTransition] = useTransition();
  const [customer, setCustomer] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const treatment = scheduleprops.user.Treatment.find((item) => {
      console.log("item", item);
      console.log("service", service);

      return item.id == service;
    });
    console.log("treatment", treatment);

    if (!treatment) return;
    const getData = async (date: string, userId: string, duration: number) => {
      try {
        const res = await getQueuesByDate(userId, date, duration, time);

        console.log("res", res);
        if (res) setSlots(res);

        return res;
      } catch (err) {
        console.log(err);
        return null;
      }
    };
    getData(date, userId, treatment.duration);
  }, [service, setService]);

  const steps = [
    {
      title: "For Who?",
      content: (
        <SelectUser
          customer={customer}
          setCustomer={setCustomer}
          business={scheduleprops.business}
        />
      ),
    },
    {
      title: "For What?",
      content: (
        <SelectService
          service={service}
          setService={setService}
          user={scheduleprops.user}
          setTitle={setTitle}
          setDuration={setDuration}
          duration={duration}
          title={title}
        />
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>
      <Steps current={current} items={items} />
      <div
        style={contentStyle}
        className="flex flex-col justify-start items-center gap-5"
      >
        {steps[current]?.content}
      </div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button
            className="bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-md text-white"
            onClick={() => next()}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            className="bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-md text-white"
            onClick={() => {
              startTransition(() =>
                createAppointment(
                  userId,
                  customer,
                  slots,
                  service,
                  scheduleprops.business.id,
                  null,
                  date,
                  service ? service : title
                )
              );
              message.success("Appointment is created successfully");
            }}
            disabled={!slots.length || slots.length == 0}
            isLoading={isPending}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
}

export default Appointment;

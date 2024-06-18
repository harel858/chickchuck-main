import React, { useTransition } from "react";
import { AppointmentRequest, Customer, Treatment, User } from "@prisma/client";
import { List } from "antd";
import dayjs from "dayjs";
import { Button } from "@ui/Button";
import { denyAppointment } from "actions/denyAppointment";
import { BiTrash } from "react-icons/bi";
function RequestEvent({
  item,
  freebusy,
}: {
  item: AppointmentRequest & {
    treatment: Treatment;
    customer: Customer;
    user: User;
  };
  freebusy: string;
}) {
  const [isPending, startTransition] = useTransition();
  const startTime = dayjs(item.start).format("HH:mm");
  const formatDate = dayjs(item.start).format("DD/MM/YYYY");
  return (
    <List.Item
      key={item.id}
      className="bg-slate-100 list-none flex max-md:flex-col justify-center items-center"
      dir="rtl"
      actions={
        item.isConfirmed === null
          ? [
              <Button
                size={"sm"}
                onClick={() =>
                  startTransition(async () => await denyAppointment(item.id))
                }
                isLoading={isPending}
                variant={"destructive"}
                type="button"
                className="text-red-500 hover:text-black flex justify-center items-center gap-2"
                key={"deny"}
              >
                <BiTrash className="text-2xl text-red-500 group-hover:text-white" />
                <span>ביטול התור</span>
              </Button>,
            ]
          : []
      }
    >
      <List.Item.Meta
        title={
          item.isConfirmed === null
            ? "ממתין לאישור"
            : item.isConfirmed === true
            ? "התור אושר"
            : "התור בוטל"
        }
        className="w-full text-black text-right gap-0"
      />
      <List.Item.Meta
        description={`${item.title} - בתאריך ${formatDate} בשעה ${startTime}`}
        className="w-full  text-black text-right gap-0"
      />
    </List.Item>
  );
}

export default RequestEvent;

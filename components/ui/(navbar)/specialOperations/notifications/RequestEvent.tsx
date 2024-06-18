import React, { useTransition } from "react";
import { AppointmentRequest, Customer, Treatment, User } from "@prisma/client";
import { List } from "antd";
import dayjs from "dayjs";
import { Session } from "next-auth";
import { Button } from "@ui/Button";
import { confirmAppointment } from "actions/confirmAppointment";
import { denyAppointment } from "actions/denyAppointment";
function RequestEvent({
  item,
  session,
}: {
  item: AppointmentRequest & {
    treatment: Treatment;
    customer: Customer;
    user: User;
  };
  session: Session;
}) {
  const [isPending, startTransition] = useTransition();
  const [isPending2, startTransition2] = useTransition();

  const startTime = dayjs(item.start).format("hh:mm");
  const formatDate = dayjs(item.start).format("DD/MM/YYYY");
  return (
    <List.Item
      key={item.id}
      actions={
        item.isConfirmed === null
          ? [
              <div className="flex justify-center items-center">
                <Button
                  size={"sm"}
                  onClick={() =>
                    startTransition(async () => await denyAppointment(item.id))
                  }
                  isLoading={isPending}
                  variant={"ghost"}
                  type="button"
                  className="text-red-500"
                  key={"deny"}
                >
                  סירוב
                </Button>
                <Button
                  size={"sm"}
                  onClick={() =>
                    startTransition2(
                      async () =>
                        await confirmAppointment(
                          session.user.access_token!,
                          item.treatment,
                          { start: item.start, end: item.end },
                          item.user,
                          item.customer,
                          item.id
                        )
                    )
                  }
                  isLoading={isPending2}
                  key={"consfirm"}
                  variant={"ghost"}
                  type="button"
                  className="text-blue-500"
                >
                  אישור
                </Button>
              </div>,
            ]
          : [
              <p
                className={`${
                  item.isConfirmed === true ? "text-green-500" : "text-red-500"
                } font-bold text-base`}
              >
                {item.isConfirmed === true ? "התור אושר" : "התור סורב"}
              </p>,
            ]
      }
    >
      <List.Item.Meta
        title={
          <div style={{ textAlign: "right", direction: "rtl" }}>
            {item.customer.name}
          </div>
        }
        description={
          <div className="flex flex-col text-black justify-center items-center text-right gap-0 ">
            {item.title} - בתאריך {formatDate} בשעה {startTime}{" "}
          </div>
        }
      />
    </List.Item>
  );
}

export default RequestEvent;

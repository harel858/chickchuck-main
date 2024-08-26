import React, { useTransition } from "react";
import { List } from "antd";
import dayjs from "dayjs";
import { Button } from "@ui/Button";
import { denyAppointment } from "actions/denyAppointment";
import { BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { calendar_v3 } from "googleapis";
import { deleteGoogleCalendarEvent } from "actions/deleteGoogleAppointment";

function GoogleEvents({
  item,
  freebusy,
}: {
  item: calendar_v3.Schema$Event;
  freebusy: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Safely handle the dateTime property
  const startTime = item.start?.dateTime
    ? dayjs(item.start.dateTime).format("HH:mm")
    : "Invalid time"; // Fallback value
  const formatDate = item.start?.dateTime
    ? dayjs(item.start.dateTime).format("DD/MM/YYYY")
    : "Invalid date"; // Fallback value

  // Safely handle the id property
  const eventId = item.id || ""; // Fallback value if id is null or undefined

  return !eventId ? (
    <></>
  ) : (
    <List.Item
      key={eventId}
      className="bg-slate-100 list-none flex max-md:flex-col justify-center items-center"
      dir="rtl"
      actions={[
        <Button
          size={"sm"}
          onClick={() => {
            startTransition(async () => {
              await deleteGoogleCalendarEvent(freebusy, eventId);
            });
            router.refresh();
          }}
          isLoading={isPending}
          variant={"destructive"}
          type="button"
          className="text-red-500 hover:text-black flex justify-center items-center gap-2"
          key={"deny"}
        >
          <BiTrash className="text-2xl text-red-500 group-hover:text-white" />
          <span>ביטול התור</span>
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={"התור אושר"}
        className="w-full text-black text-right gap-0"
      />
      <List.Item.Meta
        description={`${item.summary} - בתאריך ${formatDate} בשעה ${startTime}`}
        className="w-full  text-black text-right gap-0"
      />
    </List.Item>
  );
}

export default GoogleEvents;

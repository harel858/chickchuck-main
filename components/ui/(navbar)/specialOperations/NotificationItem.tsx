import React from "react";
import { Appointment } from "@prisma/client";
import updateItem from "actions/updateNotification";
import { Notification, NotificationData } from "types/types";

function NotificationItem({
  NotificationData,
}: {
  NotificationData: NotificationData;
}) {
  console.log(NotificationData);

  return (
    <li
      className="z-50 w-full cursor-pointer"
      onClick={() => updateItem(NotificationData.notification)}
    >
      NotificationItem
    </li>
  );
}

export default NotificationItem;

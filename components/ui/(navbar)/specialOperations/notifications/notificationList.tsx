import React from "react";
import { List } from "antd";
import { Session } from "next-auth";
import { Customer } from "@prisma/client";
import { CombinedEvent } from "types/types";
import { isGoogleEvent } from "./utils/typeGourd";
import GoogleEvent from "./GoogleEvent";
import RequestEvent from "./RequestEvent";

const NotificationList = ({
  notifications,
  session,
  customers,
  closePopover,
}: {
  notifications: CombinedEvent[];
  session: Session;
  customers: Customer[];
  closePopover: () => void;
}) => {
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        width: "50vw",
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <List
        dataSource={notifications}
        itemLayout="vertical"
        renderItem={(item: CombinedEvent) =>
          isGoogleEvent(item) ? (
            <GoogleEvent
              item={item}
              customers={customers}
              closePopover={closePopover}
              session={session}
            />
          ) : (
            <RequestEvent item={item} session={session} />
          )
        }
      />
    </div>
  );
};

export default NotificationList;

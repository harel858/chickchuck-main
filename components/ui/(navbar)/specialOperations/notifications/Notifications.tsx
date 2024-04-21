import React, { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@ui/Button";
import { Popover } from "antd";
import { GrNotification } from "react-icons/gr";
import { Session } from "next-auth";
import { calendar_v3 } from "googleapis";
import NotificationList from "./notificationList";
import { Customer } from "@prisma/client";

interface NotificationComponentProps {
  userId: string;
  session: Session;
  customers: Customer[];
  scheduleProps: calendar_v3.Schema$Events | null;
}

function NotificationComponent({
  userId,
  session,
  scheduleProps,
  customers,
}: NotificationComponentProps) {
  const [notifications, setNotifications] = useState<
    calendar_v3.Schema$Events["items"]
  >([]);
  /* useEffect(() => {
    const notifications = scheduleProps?.items?.filter((item) =>
      customers?.find(
        (customer) =>
          customer.id === item.extendedProperties?.private?.customerId
      )
    );
    notifications && setNotifications(notifications);
  }, []); */
  const webSocketRef = useRef<WebSocket | null>(null);
  const [open, setOpen] = useState(false);
  const closePopover = useCallback(() => setOpen(false), [open]);
  const hidePopover = () => setOpen(false);

  const handleOpenChange = (newOpen: boolean) => setOpen(newOpen);

  const handleWebSocketOpen = () => {
    console.log("WebSocket connection opened");
  };

  const handleWebSocketMessage = useCallback(
    (e: MessageEvent<any>) => {
      console.log("message", e?.data);

      const newNotifications = (JSON.parse(e.data) as calendar_v3.Schema$Events)
        ?.items;
      const filteredNewNotifications = newNotifications?.filter(
        (newNotification) =>
          !notifications?.some(
            (notification) => notification.etag === newNotification.etag
          )
      );
      notifications &&
        filteredNewNotifications &&
        setNotifications((prevNotifications) => [
          ...notifications,
          ...filteredNewNotifications,
        ]);
    },
    [notifications]
  );

  const createWebSocketUrl = () =>
    `wss://bjkn2zeka0.execute-api.eu-west-1.amazonaws.com/production?userId=${userId}`;

  useEffect(() => {
    try {
      const wsUrl = createWebSocketUrl();
      webSocketRef.current = new WebSocket(wsUrl);
      webSocketRef.current.onopen = handleWebSocketOpen;
      webSocketRef.current.onmessage = handleWebSocketMessage;
      webSocketRef.current.onerror = (event) => {
        console.error("WebSocket error:", event);
      };
    } catch (error) {
      console.error("WebSocket initialization error:", error);
    }
    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, [handleWebSocketMessage]);

  return (
    <Popover
      content={
        <NotificationList
          closePopover={closePopover}
          session={session}
          customers={customers}
          notifications={notifications}
        />
      }
      title={<div style={{ textAlign: "right" }}>התראות</div>} // Centered title
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={hidePopover}
          className="relative transition-all ease-in-out duration-300 hover:scale-125"
        >
          <GrNotification className="text-3xl" />
          {notifications && notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs">
              {notifications.length}
            </span>
          )}
        </Button>
      </div>
    </Popover>
  );
}

export default NotificationComponent;

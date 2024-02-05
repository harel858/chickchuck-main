import React, { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@ui/Button";
import { Popover } from "antd";
import { GrNotification } from "react-icons/gr";
import { Session } from "next-auth";
import NotificationList from "./notificationList";
import { calendar_v3 } from "googleapis";

interface NotificationComponentProps {
  userId: string;
  session: Session;
  scheduleProps: calendar_v3.Schema$Events | null;
}

interface Notification {
  read: boolean;
  // Add other properties as needed
}
function NotificationComponent({
  userId,
  session,
  scheduleProps,
}: NotificationComponentProps) {
  scheduleProps?.items;

  const [notifications, setNotifications] = useState<
    calendar_v3.Schema$Event[]
  >(scheduleProps?.items || []);
  console.log("notifications[0]", notifications[0]);

  const webSocketRef = useRef<WebSocket | null>(null);
  const [open, setOpen] = useState(false);

  const hidePopover = () => setOpen(false);

  const handleOpenChange = (newOpen: boolean) => setOpen(newOpen);

  const handleWebSocketOpen = (event: Event) => {
    console.log("WebSocket connection opened:", event);
  };

  const handleWebSocketMessage = useCallback(
    (e: MessageEvent<any>) => {
      console.log("notifications", e);

      const newNotifications = JSON.parse(
        e.data
      ) as calendar_v3.Schema$Events[];
      console.log("newNotifications", newNotifications);

      // Check for duplicates based on etag
      const filteredNewNotifications = newNotifications.filter(
        (newNotification) =>
          !notifications.some(
            (notification) => notification.etag === newNotification.etag
          )
      );

      // Handle your notifications update logic here

      setNotifications((prevNotifications) => [
        ...prevNotifications,
        ...filteredNewNotifications,
      ]);
    },
    [notifications]
  );

  const createWebSocketUrl = () => {
    return `wss://bjkn2zeka0.execute-api.eu-west-1.amazonaws.com/production/?userId=${userId}`;
  };

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
    /*     return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    }; */
  }, []);

  /*   const unreadNotificationCount = notifications.filter((item) => !item).length;
   */
  console.log("notifications", notifications);

  return (
    <Popover
      content={<NotificationList notifications={notifications} />}
      title="Notifications"
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
          {notifications.length > 0 && (
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

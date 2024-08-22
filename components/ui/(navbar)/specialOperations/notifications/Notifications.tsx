"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@ui/Button";
import { Popover } from "antd";
import { GrNotification } from "react-icons/gr";
import { Session } from "next-auth";
import { calendar_v3 } from "googleapis";
import NotificationList from "./notificationList";
import { AppointmentRequest, Customer, Treatment, User } from "@prisma/client";
import { CombinedEvent } from "types/types";
import dayjs from "dayjs";
import { isGoogleEvent } from "./utils/typeGourd";
import { updateEventsUnreadStatusToFalse } from "actions/updateEvent";

interface NotificationComponentProps {
  userId: string;
  session: Session;
  customers: Customer[];
  scheduleProps: CombinedEvent[];
  confirmationNeeded: boolean | null;
  access_token: string;
  calendarId: string | null;
}

function NotificationComponent({
  userId,
  session,
  scheduleProps,
  customers,
  confirmationNeeded,
  access_token,
  calendarId,
}: NotificationComponentProps) {
  const [notifications, setNotifications] = useState<CombinedEvent[]>([]);
  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    const filteredNotifications = scheduleProps?.filter((item) =>
      isGoogleEvent(item)
        ? item.extendedProperties?.private?.unread
        : item.customerId
    );

    if (filteredNotifications) {
      // Sort the filteredNotifications array by dateTime
      const sortedNotifications = filteredNotifications.sort((a, b) => {
        const dateA = isGoogleEvent(a)
          ? new Date(dayjs(a.created).toISOString()).getTime()
          : new Date(dayjs(a.created).toISOString()).getTime();
        const dateB = isGoogleEvent(b)
          ? new Date(dayjs(b.created).toISOString()).getTime()
          : new Date(dayjs(b.created).toISOString()).getTime();
        return dateB - dateA;
      });

      setNotifications(sortedNotifications);
    }

    filteredNotifications && setNotifications(filteredNotifications);

    if (confirmationNeeded === true) {
      setLength(
        (
          notifications as (AppointmentRequest & {
            treatment: Treatment;
            customer: Customer;
            user: User;
          })[]
        ).filter((item) => item.isConfirmed === null).length
      );
    } else {
      setLength(
        (notifications as calendar_v3.Schema$Event[]).filter(
          (item) => item.extendedProperties?.private?.unread === "true"
        ).length
      );
    }
  }, [scheduleProps]);

  const webSocketRef = useRef<WebSocket | null>(null);
  const [open, setOpen] = useState(false);
  const closePopover = useCallback(() => setOpen(false), [open]);
  const hidePopover = () => setOpen(false);

  const handleOpenChange = async (newOpen: boolean) => {
    setOpen(newOpen);

    if (!confirmationNeeded && length > 0) {
      setLength(0);
      try {
        updateEventsUnreadStatusToFalse(
          access_token,
          notifications as calendar_v3.Schema$Event[],
          calendarId || "primary"
        );
      } catch (err: any) {
        console.log("error", err);
      }
    }
  };

  const handleWebSocketOpen = () => {};

  const handleWebSocketMessage = useCallback(
    (e: MessageEvent<any>) => {
      console.log("message", JSON.parse(e.data));

      const newNotifications = (
        JSON.parse(e.data) as calendar_v3.Schema$Events[]
      )[0]?.items;
      const filteredNewNotifications = newNotifications?.filter(
        (newNotification) =>
          !notifications?.some(
            (notification) => notification.id === newNotification.id
          )
      );

      notifications &&
        filteredNewNotifications &&
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          ...filteredNewNotifications,
        ]);
    },
    [notifications]
  );
  console.log("notifications", notifications);

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
  /*  const length = confirmationNeeded
    ? (
        notifications as (AppointmentRequest & {
          treatment: Treatment;
          customer: Customer;
          user: User;
        })[]
      ).filter((item) => item.isConfirmed === null).length
    : (notifications as calendar_v3.Schema$Event[]).filter(
        (item) => item.extendedProperties?.private?.unread === "true"
      ).length; */
  return (
    <Popover
      content={
        <NotificationList
          closePopover={closePopover}
          session={session}
          customers={customers}
          notifications={notifications}
          access_token={access_token}
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
          {notifications && length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs">
              {length}
            </span>
          )}
        </Button>
      </div>
    </Popover>
  );
}

export default NotificationComponent;

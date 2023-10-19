"use client";
import {
  Appointment,
  AppointmentSlot,
  Customer,
  Treatment,
} from "@prisma/client";
import { Button } from "@ui/Button";
import { Popover } from "antd";
import { useState, useEffect, useRef } from "react";
import { GrNotification } from "react-icons/gr";
import { Notification, NotificationData } from "types/types";
import NotificationList from "./notificationList";

function NotificationComponent({
  appointments,
  userId,
}: {
  appointments: (Appointment & {
    customer: Customer;
    treatment: Treatment;
    appointmentSlot: AppointmentSlot;
  })[];
  userId: string;
}) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const webSocketRef = useRef<WebSocket | null>(null);
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  useEffect(() => {
    // Initialize the WebSocket when the component mounts
    webSocketRef.current = new WebSocket(
      `wss://bjkn2zeka0.execute-api.eu-west-1.amazonaws.com/production/?userId=${userId}`
    );

    // Handle incoming WebSocket messages
    webSocketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data) as Notification[];
      console.log("data", data);

      // Check if the received data is a valid notification
      if (data && data.length > 0) {
        const newNotifications: NotificationData[] = []; // Create a new array

        for (let i = 0; i < data.length; i++) {
          const matchingAppointment = appointments.find(
            (appointment) => appointment.id === data[i]?.appointmentId
          );
          const notification = data[i];

          if (matchingAppointment && notification) {
            newNotifications.push({
              notification: notification,
              appointment: matchingAppointment,
            });
          }
        }

        // Update the state with the new notifications
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          ...newNotifications,
        ]);
      }
    };

    return () => {
      // Clean up the WebSocket when the component unmounts
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, []); // An empty dependency array ensures this effect runs only once when the component mounts
  const NOTIFICATION_LENGTH = notifications.filter(
    (item) => item.notification.read
  ).length;

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
          onClick={hide}
          className="relative transition-all ease-in-out duration-300 hover:scale-125"
        >
          <GrNotification className="text-3xl" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs">
              {NOTIFICATION_LENGTH}
            </span>
          )}
        </Button>
      </div>
    </Popover>
  );
}

export default NotificationComponent;

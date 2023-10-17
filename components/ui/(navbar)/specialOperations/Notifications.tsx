"use client";
import { Appointment } from "@prisma/client";
import { useState, useEffect, useRef } from "react";
import { GrNotification } from "react-icons/gr";
import { Notification, NotificationData } from "types/types";
import NotificationItem from "./NotificationItem";

function NotificationComponent({
  appointments,
  userId,
}: {
  appointments: Appointment[];
  userId: string;
}) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const webSocketRef = useRef<WebSocket | null>(null);

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

  return (
    <div className="relative">
      <button className="relative bg-transparent focus:outline-none">
        <GrNotification className="text-3xl" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs">
            {notifications.length}
          </span>
        )}
      </button>
      {notifications.length > 0 && (
        <ul className="absolute right-0 mt-2 w-64 max-w-md bg-white shadow-lg rounded-lg p-2">
          {notifications.map((notification, index) => (
            <NotificationItem key={index} NotificationData={notification} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotificationComponent;

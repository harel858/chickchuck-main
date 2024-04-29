import React from "react";
import { List } from "antd";
import dayjs from "dayjs";
import { calendar_v3 } from "googleapis";
import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons";
import { Session } from "next-auth";
import DetailsButton from "@components/clients/details/DetailsButton";
import { Customer } from "@prisma/client";
const NotificationList = ({
  notifications,
  session,
  customers,
  closePopover,
}: {
  notifications: calendar_v3.Schema$Event[] | undefined;
  session: Session;
  customers: Customer[];
  closePopover: () => void;
}) => {
  const getTitleByStatus = (
    status: calendar_v3.Schema$Event["status"],
    name: string | undefined,
    summary: string | null | undefined,
    startTime: string,
    endTime: string,
    formatDate: string
  ) => {
    switch (status) {
      case "confirmed":
        return (
          <p className="text-right">
            {name} קבע/ה תור ל{summary}
          </p>
        );
      case "pending":
        return "Pending Event";
      case "cancelled":
        return (
          <>
            <CloseCircleOutlined className="text-xl text-red-500" />
            {""} {name} ביטל/ה תור ל{summary}
          </>
        );
      default:
        return "Unknown Event";
    }
  };

  // Reverse the notifications array
  const reversedNotifications = notifications
    ? [...notifications].reverse()
    : [];

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
        dataSource={reversedNotifications}
        renderItem={(item) => {
          const customer = customers.find(
            (customer) =>
              customer.id === item.extendedProperties?.private?.customerId
          );
          const customerName = item.extendedProperties?.private?.customerName;
          const startTime = dayjs(item.start?.dateTime).format("hh:mm");
          const endTime = dayjs(item.end?.dateTime).format("hh:mm");
          const formatDate = dayjs(item.end?.dateTime).format("DD/MM/YYYY");
          return (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  customer ? (
                    <DetailsButton
                      closePopover={closePopover}
                      session={session}
                      customer={customer}
                    />
                  ) : (
                    <></>
                  )
                }
                title={
                  <div style={{ textAlign: "right", direction: "rtl" }}>
                    {getTitleByStatus(
                      item.status,
                      customerName,
                      item.summary,
                      startTime,
                      endTime,
                      formatDate
                    )}
                  </div>
                }
                description={
                  <div className="flex flex-col justify-center items-center text-right gap-0 ">
                    <span className="w-max">
                      {startTime} - {endTime}
                    </span>
                    <span className="w-max">{formatDate}</span>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default NotificationList;

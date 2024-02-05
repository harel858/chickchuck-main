import classes from "./style/list.module.css";
import React, { useState } from "react";
import { Avatar, List, Modal } from "antd";
import { NotificationData } from "types/types";
import { BiEdit } from "react-icons/bi";
import { calendar_v3 } from "googleapis";

function getNotificationTitle(
  notification: calendar_v3.Schema$Events & { status?: string }
) {
  const status = notification!.status;
  const summary = notification.summary;

  switch (status) {
    case "confirmed":
      return `${summary} just made a confirmed appointment`;
    case "tentative":
      return `${summary} just made a tentative appointment`;
    case "cancelled":
      return `${summary}'s appointment has been cancelled`;
  }
}

function NotificationList({
  notifications,
}: {
  notifications: calendar_v3.Schema$Events[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  return (
    <>
      {notifications.length > 0 ? (
        <List
          className={`max-h-96 overflow-x-hidden overflow-y-auto w-96 ${classes.scrollbarCustom}`}
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(notification, index) => {
            console.log("notificationList", notification);

            const title = getNotificationTitle(notification);

            console.log("title", title);
            if (!title) return <></>;
            return (
              <>
                <List.Item
                  /* onClick={() => setModalOpen(true)} */
                  className={`hover:bg-gray-200 cursor-pointer`}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                      />
                    }
                    title={<p className="font-bold text-md">{title}</p>}
                    description={`${notification.description}`}
                  />
                </List.Item>
                <Modal
                  title={
                    <div className="flex flex-row justify-center items-center gap-2">
                      <h3 className="text-2xl">New Appointment</h3>
                      <BiEdit className="text-4xl" />
                    </div>
                  }
                  className="pt-5"
                  centered
                  open={modalOpen}
                  okButtonProps={{ hidden: true }}
                  cancelButtonProps={{ hidden: true }}
                  onCancel={() => {
                    setModalOpen(false);
                    setCurrent(0);
                  }}
                  styles={{
                    body: {
                      background: "rgba(254,215,170,0.7)",
                      borderRadius: "3em",
                      padding: "2em",
                      margin: "0 auto",
                    },
                  }}
                >
                  <div>content</div>
                </Modal>
              </>
            );
          }}
        />
      ) : (
        <p>You Have No Notifications Yet</p>
      )}
    </>
  );
}

export default NotificationList;

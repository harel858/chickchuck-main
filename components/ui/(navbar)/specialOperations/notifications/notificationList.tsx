import classes from "./style/list.module.css";
import React, { useState } from "react";
import { Avatar, List, Modal } from "antd";
import { NotificationData } from "types/types";
import { BiEdit } from "react-icons/bi";

function NotificationList({
  notifications,
}: {
  notifications: NotificationData[];
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
          renderItem={(item, index) => (
            <>
              <List.Item
                onClick={() => setModalOpen(true)}
                className={`hover:bg-gray-200 cursor-pointer`}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                    />
                  }
                  title={
                    <h4>
                      {item.appointment.customer.name} just made a new
                      appointment
                    </h4>
                  }
                  description={`${item.notification.content}`}
                />
              </List.Item>
              <Modal
                title={
                  <div className="flex flex-row justify-center items-center gap-2">
                    <h3 className="font-sans text-2xl">New Appointment</h3>
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
          )}
        />
      ) : (
        <p>You Have No Notifications Yet</p>
      )}
    </>
  );
}

export default NotificationList;

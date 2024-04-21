import React, { useState } from "react";
import Form from "./form/Form";
import { Modal, notification } from "antd";
import { Button } from "@ui/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { NotificationPlacement } from "antd/es/notification/interface";
import { TeamPageParams } from "types/types";

export default function AddMember({ business }: { business: TeamPageParams }) {
  const [modal1Open, setModal1Open] = useState(false);
  const [current, setCurrent] = useState(0);
  const [api, contextHolder] = notification.useNotification();

  const successNotification = (placement: NotificationPlacement) => {
    api.success({
      message: `Notification ${placement}`,
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement,
    });
  };
  return (
    <>
      <Button
        onClick={() => setModal1Open(true)}
        className="flex flex-row-reverse justify-center items-center gap-2 text-xl font-medium text-black bg-slate-100 hover:text-white"
      >
        New Team Member
        <AiOutlinePlusCircle className="text-3xl" />
      </Button>
      <Modal
        title={
          <div className="flex flex-row justify-center items-center gap-2">
            <h3 className="font-sans text-2xl">New Member</h3>
            <UsergroupAddOutlined className="text-4xl" />
          </div>
        }
        className="pt-5"
        centered
        open={modal1Open}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => {
          setModal1Open(false);
          setCurrent(0);
        }}
        bodyStyle={{
          background: "rgba(254,215,170,0.7)",
          borderRadius: "3em",
          padding: "2em",
          margin: "0 auto",
        }}
      >
        <Form
          current={current}
          setCurrent={setCurrent}
          business={business}
          setModal1Open={setModal1Open}
          successNotification={successNotification}
        />
      </Modal>
    </>
  );
}

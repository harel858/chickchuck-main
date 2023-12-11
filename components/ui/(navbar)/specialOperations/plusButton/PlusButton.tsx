"use client";
import React, { useCallback, useState } from "react";
import { PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import { TbCalendarPlus } from "react-icons/tb";
import { FloatButton, Modal } from "antd";
import Customer from "./Customer";
import { Session } from "next-auth";

const PlusButton = ({ session }: { session: Session }) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoading2, setConfirmLoading2] = useState(false);

  const handleOk = useCallback(() => {
    setOpen(false);
  }, []);
  const handleOk2 = useCallback(() => {
    setOpen2(false);
  }, []);

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const handleCancel2 = () => {
    console.log("Clicked cancel button");
    setOpen2(false);
  };
  return (
    <>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        shape="square"
        icon={<PlusOutlined />}
      >
        <FloatButton
          onClick={() => setOpen(true)}
          icon={
            <div className=" text-center flex justify-center items-center">
              <UserAddOutlined className="w-full h-full scale-150" />
            </div>
          }
          shape="square"
          style={{ right: 24 }}
        />
        <FloatButton
          onClick={() => setOpen2(true)}
          icon={
            <div className="text-center flex justify-center items-center">
              <TbCalendarPlus className="w-full h-full scale-150" />
            </div>
          }
          shape="square"
          style={{ right: 164 }}
        />
      </FloatButton.Group>
      <Modal
        title="New Client"
        open={open}
        onOk={handleOk}
        okButtonProps={{
          className: "hidden",
        }}
        cancelButtonProps={{ className: "hidden" }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Customer bussinesId={session.user.businessId} />
      </Modal>
      <Modal
        title="New Appointment"
        open={open2}
        onOk={handleOk2}
        okButtonProps={{
          className: "bg-blue-600",
        }}
        confirmLoading={confirmLoading2}
        onCancel={handleCancel2}
      >
        <Customer bussinesId={session.user.businessId} />
      </Modal>
    </>
  );
};

export default PlusButton;

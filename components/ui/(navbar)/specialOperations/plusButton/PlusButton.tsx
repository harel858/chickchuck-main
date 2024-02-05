"use client";
import React, { useCallback, useState } from "react";
import { PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import { TbCalendarPlus } from "react-icons/tb";
import { FloatButton, Modal } from "antd";
import AddCustomer from "./Customer";
import AppointmentSteps from "./appointments/newAppointment";
import { Session } from "next-auth";
import {
  Account,
  ActivityDays,
  Business,
  Customer,
  Treatment,
  User,
} from "@prisma/client";
import { calendar_v3 } from "googleapis";

const PlusButton = ({
  session,
  user,
  business,
}: {
  session: Session;
  business: Business & {
    Customer: Customer[];
  };
  user: User & {
    accounts: Account[];
    Treatment: Treatment[];
    activityDays: ActivityDays[];
    Customer: Customer[];
  };
}) => {
  console.log("user", user);

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

  const handleCancel = useCallback(() => {
    console.log("Clicked cancel button");
    setOpen(false);
  }, [setOpen]);

  const handleCancel2 = useCallback(() => {
    console.log("Clicked cancel button");
    setOpen2(false);
  }, [setOpen2]);

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
          icon={<UserAddOutlined className="w-full h-full scale-150" />}
          shape="square"
          style={{ right: 24 }}
        />
        <FloatButton
          onClick={() => setOpen2(true)}
          icon={<TbCalendarPlus className="w-full h-full scale-150" />}
          shape="square"
          style={{ right: 164 }}
        />
      </FloatButton.Group>

      <Modal
        title="New Client"
        open={open}
        onOk={handleOk}
        okButtonProps={{ className: "hidden" }}
        cancelButtonProps={{ className: "hidden" }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <AddCustomer business={business} />
      </Modal>

      <Modal
        open={open2}
        onOk={handleOk2}
        className="z-0"
        okButtonProps={{ className: "hidden" }}
        cancelButtonProps={{ className: "hidden" }}
        confirmLoading={true}
        onCancel={handleCancel2}
      >
        <AppointmentSteps
          user={user}
          business={business}
          handleCancel2={handleCancel2}
          session={session}
        />
      </Modal>
    </>
  );
};

export default PlusButton;

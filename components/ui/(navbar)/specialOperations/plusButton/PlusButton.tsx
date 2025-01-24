"use client";
import React, { useCallback, useState } from "react";
import { PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import { TbCalendarPlus } from "react-icons/tb";
import { FaCreativeCommonsShare } from "react-icons/fa";
import { FloatButton, Modal, message, theme } from "antd";
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
import { motion } from "framer-motion";

const PlusButton = ({
  session,
  user,
  business,
  access_token,
  locale,
}: {
  session: Session;
  locale: string;
  access_token: string;
  business: Business & {
    Customer: Customer[];
    user: User[];
  };
  user: User & {
    accounts: Account[];
    Treatment: Treatment[];
    activityDays: ActivityDays[];
    Customer: Customer[];
  };
}) => {
  console.log("user", user);
  const formattedBusinessName = session.user.businessName?.replace(/\s+/g, "-"); // Replace whitespace with hyphens

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { token } = theme.useToken();

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

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    width: "100%",
    color: token.colorTextTertiary,
    backgroundColor: "rgb(203 213 225)",
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  const copyToClipboard = () => {
    const link = `https://www.quickline.co.il/${locale}/${formattedBusinessName}`;
    navigator.clipboard.writeText(link);
    message.success("קישור הועתק ללוח");
  };
  return (
    <>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: "27px", bottom: "24px" }}
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
        <FloatButton
          onClick={() => copyToClipboard()}
          icon={<FaCreativeCommonsShare className="w-full h-full scale-150" />}
          shape="square"
          style={{ right: 24 }}
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
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="w-full py-5"
        >
          <div
            style={contentStyle}
            className="flex justify-center items-center py-5"
          >
            <AddCustomer
              handleCancel={handleCancel}
              isHidden={false}
              business={business}
            />
          </div>
        </motion.div>
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
          access_token={access_token}
        />
      </Modal>
    </>
  );
};

export default PlusButton;

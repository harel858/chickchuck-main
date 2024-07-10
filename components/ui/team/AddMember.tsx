"use client";
import React, { ChangeEvent, useCallback, useState } from "react";
import { List, message, Modal } from "antd";
import { Button } from "@ui/Button";
import { PlusCircleTwoTone, PlusOutlined } from "@ant-design/icons";
import ServiceForm from "@ui/Init/ServiceForm";
import MemberForm from "./MemberForm";
import { RequiredDocument, Treatment, User } from "@prisma/client";
import createService from "actions/createService";
import { useForm } from "react-hook-form";
import {
  MemberValidation,
  TMemberValidation,
} from "@lib/validators/memberDetails";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";

const AddMember = ({
  users,
  businessId,
  session,
  access_token,
}: {
  businessId: string;
  users: User[];
  session: Session;
  access_token: string;
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen, open]);

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full">
      <Button
        className="flex justify-center items-center gap-1 bg-white text-black hover:bg-slate-950 hover:text-white"
        onClick={showModal}
      >
        <PlusOutlined className="text-xl" />
        <span>הוסף חבר צוות</span>
      </Button>

      <Modal
        title="איש צוות חדש"
        open={open}
        okButtonProps={{
          hidden: true,
        }}
        cancelButtonProps={{ hidden: true }}
        cancelText="סגור"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <MemberForm
          handleCancel={handleCancel}
          session={session}
          businessId={businessId}
          users={users}
          access_token={access_token}
        />
      </Modal>
    </div>
  );
};

export default AddMember;

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
  BusinessDetailsValidation,
  TBusinessDetailsValidation,
} from "@lib/validators/business-details-validation";
import { zodResolver } from "@hookform/resolvers/zod";

const AddMember = ({
  users,
  businessId,
}: {
  businessId: string;
  users: User[];
}) => {
  const form = useForm<TBusinessDetailsValidation>({
    resolver: zodResolver(BusinessDetailsValidation),
  });

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = useCallback(async () => {
    try {
    } catch (err) {
      // Reset service state to initial state
      console.log(err);
    }
  }, []);

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full">
      <Button
        className="flex justify-center items-center gap-1 bg-white text-black hover:bg-slate-950 hover:text-white"
        onClick={showModal}
      >
        {" "}
        <PlusOutlined className="text-xl" />
        <span>הוסף חבר צוות</span>
      </Button>

      <Modal
        title="New Service"
        open={open}
        onOk={handleOk}
        okButtonProps={{
          className: "bg-blue-600",
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <MemberForm />
      </Modal>
    </div>
  );
};

export default AddMember;

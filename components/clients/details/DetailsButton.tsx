import React, { useCallback, useEffect } from "react";
import { CustomerItem } from "types/types";
import { Modal } from "antd";
import { BiEdit } from "react-icons/bi";
import axios from "axios";
import { Session } from "next-auth";
import CustomerCard from "./customerCard";
import { HistoryOutlined } from "@ant-design/icons";
import { Button } from "@ui/Button";
import { Customer } from "@prisma/client";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
/* 
const items: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "UserName",
    children: "Zhou Maomao",
  },
  {
    key: "2",
    label: "Telephone",
    children: "1810000000",
  },
  {
    key: "3",
    label: "Live",
    children: "Hangzhou, Zhejiang",
  },
  {
    key: "4",
    label: "Remark",
    children: "empty",
  },
  {
    key: "5",
    label: "Address",
    children: "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
  },
]; */
export default function DetailsButton({
  customer,
  session,
  closePopover,
}: {
  customer: Customer;
  session: Session;
  closePopover?: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    closePopover && closePopover();
    setOpen(true);
  };

  return (
    <>
      <Button
        variant={"ghost"}
        onClick={handleClickOpen}
        className="group-hover:bg-slate-100 group-hover:text-black"
      >
        <HistoryOutlined className="text-xl" />
      </Button>
      <Modal
        title={
          <div className="flex flex-row justify-center items-center gap-2">
            <h3 className="text-2xl">{customer?.name}</h3>
            <BiEdit className="text-4xl" />
          </div>
        }
        className="pt-5 "
        centered
        open={open}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => {
          setOpen(false);
        }}
        width={800} // Set the width to 800 pixels, adjust as needed
        styles={{
          body: {
            background: "rgba(254,215,170,0.7)",
            borderRadius: "3em",
            padding: "2em 1em",
          },
        }}
      >
        <CustomerCard customer={customer} session={session} />
      </Modal>
    </>
  );
}

import React from "react";
import { message, Popconfirm } from "antd";
import { RequiredDocument, Treatment } from "@prisma/client";
import { Button } from "@ui/Button";
import { BiTrash } from "react-icons/bi";
import { deleteService } from "actions/deleteService";

function DeleteButton({ userId }: { userId: string }) {
  const confirm = () => {
    /*     deleteService(treatment.id);
     */ message.success("The Service has been deleted");
  };

  return (
    <Popconfirm
      title="Delete The Service"
      description="Are you sure to delete this service?"
      onConfirm={() => confirm()}
      okText="Yes"
      okButtonProps={{
        color: "balck",
        style: { background: "rgb(0, 86, 206)" },
      }}
      cancelText="No"
    >
      <Button className="group-hover:bg-red-500 hover:scale-125 transition-all ease-in-out duration-200 group-hover:text-black rounded-full">
        <BiTrash className="text-2xl text-red-500 group-hover:text-white" />
      </Button>
    </Popconfirm>
  );
}

export default DeleteButton;

import React, { ChangeEvent, useCallback, useState } from "react";
import { Card, Col, List, Modal, Row } from "antd";
import { ServiceInput } from "./InitServices";
import { Button } from "@ui/Button";
import { CiEdit, CiTrash } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import ServiceForm, { ServiceFieldType } from "./ServiceForm";
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const CardItem = ({
  item,
  setServices,
  services,
}: {
  item: ServiceInput;
  services: ServiceInput[];
  setServices: React.Dispatch<React.SetStateAction<ServiceInput[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<ServiceInput>(item);

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleServicesChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { name, value },
      } = e;
      console.log("service", service);
      setService({ ...service, [name]: value });
    },
    [service]
  );
  const handleOk = useCallback(() => {
    // Find the index of the current service in the services array
    const index = services.findIndex((s) => s.title === item.title);

    if (index !== -1) {
      // Create a new array with the updated service
      const updatedServices = [...services];
      updatedServices[index] = service;

      // Update the state with the new array
      setServices(updatedServices);

      // Close the modal
      setOpen(false);
    }
  }, [service, services, setServices]);

  return (
    <>
      <List.Item
        className="bg-orange-50 border-slate-950 w-full border-b"
        actions={[
          <CiTrash
            className="text-2xl hover:text-red-500 cursor-pointer"
            key="delete"
          />,
          <CiEdit
            className="text-2xl hover:text-blue-500 cursor-pointer"
            onClick={() => setOpen(true)}
            key="edit"
          />,
        ]}
      >
        <List.Item.Meta
          title={`${item.title} ${item.price}$`}
          description={<p className="text-black">{item.duration} minutes</p>}
          className="border-slate-950"
        />
      </List.Item>
      <Modal
        title="Edit Service"
        open={open}
        onOk={handleOk}
        okButtonProps={{
          className: "bg-blue-600",
          disabled: !item.duration || !item.price || !item.title,
        }}
        onCancel={handleCancel}
      >
        <ServiceForm
          service={service}
          handleServicesChange={handleServicesChange}
        />
      </Modal>
    </>
  );
};

export default CardItem;

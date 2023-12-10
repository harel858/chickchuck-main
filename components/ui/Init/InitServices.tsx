"use client";
import React, { ChangeEvent, useCallback, useState } from "react";
import { List, Modal } from "antd";
import { Button } from "@ui/Button";
import { PlusCircleTwoTone, PlusOutlined } from "@ant-design/icons";
import ServiceForm, { ServiceFieldType } from "./ServiceForm";
import CardItem from "./CardItem";

export type ServiceInput = {
  title: string;
  duration: number;
  price: number;
};
const initService: ServiceInput = { duration: 0, price: 0, title: "" };
const InitServices = ({
  services,
  setServices,
}: {
  services: ServiceInput[];
  setServices: React.Dispatch<React.SetStateAction<ServiceInput[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [service, setService] = useState<ServiceInput>(initService);

  const showModal = () => {
    setOpen(true);
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
    console.log("service", service);
    setServices([...services, service]);
    setOpen(false);
  }, [service]);

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setService(initService);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full">
      <Button
        className="flex justify-center items-center gap-1 bg-white text-black hover:bg-slate-950 hover:text-white"
        onClick={showModal}
      >
        <span>Add Service</span>
        <PlusOutlined className="text-xl" />
      </Button>
      <List
        itemLayout="horizontal"
        className="w-10/12 max-md:w-full"
        bordered
        dataSource={services}
        renderItem={(item, index) => (
          <CardItem
            key={item.title}
            setServices={setServices}
            services={services}
            item={item}
          />
        )}
      />
      <Modal
        title="New Service"
        open={open}
        onOk={handleOk}
        okButtonProps={{
          className: "bg-blue-600",
          disabled: !service.duration || !service.price || !service.title,
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <ServiceForm
          service={service}
          handleServicesChange={handleServicesChange}
        />
      </Modal>
    </div>
  );
};

export default InitServices;

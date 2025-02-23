"use client";
import React, { ChangeEvent, useCallback, useState } from "react";
import { List, Modal } from "antd";
import { Button } from "@ui/Button";
import { PlusOutlined } from "@ant-design/icons";
import ServiceForm, { ServiceFieldType } from "./ServiceForm";
import CardItem from "./CardItem";
import { useTranslations } from "next-intl";

export type ServiceInput = {
  title: string;
  duration: number;
  price: number;
};
const initService: ServiceInput = {
  duration: 0,
  price: 0,
  title: "",
};
const InitServices = ({
  services,
  setServices,
  locale,
}: {
  services: ServiceInput[];
  setServices: React.Dispatch<React.SetStateAction<ServiceInput[]>>;
  locale: string;
}) => {
  const t = useTranslations("serviceForm");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [service, setService] = useState<ServiceInput>(initService);

  const showModal = () => {
    setOpen(true);
  };
  const handleServicesChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { name, value },
      } = e;

      setService({ ...service, [name]: value });
    },
    [service]
  );
  const handleOk = useCallback(() => {
    setServices([...services, service]);
    setOpen(false);
    setService(initService); // Reset service state to initial state
  }, [service]);

  const handleCancel = () => {
    setOpen(false);
    setService(initService);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full">
      <Button
        className="flex justify-center items-center gap-1 bg-white text-black hover:bg-slate-950 hover:text-white"
        onClick={showModal}
      >
        <span>{t("addService")}</span>
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
            locale={locale}
          />
        )}
      />
      <Modal
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
          locale={locale}
        />
      </Modal>
    </div>
  );
};

export default InitServices;

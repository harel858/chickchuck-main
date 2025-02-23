"use client";
import React, { ChangeEvent, useCallback, useState } from "react";
import { List, Modal } from "antd";
import { ServiceInput } from "./InitServices";
import { CiEdit, CiTrash } from "react-icons/ci";
import ServiceForm from "./ServiceForm";
import { useTranslations } from "next-intl";

const CardItem = ({
  item,
  setServices,
  services,
  locale,
}: {
  item: ServiceInput;
  services: ServiceInput[];
  setServices: React.Dispatch<React.SetStateAction<ServiceInput[]>>;
  locale: string;
}) => {
  const t = useTranslations("serviceForm");
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<ServiceInput>(item);

  const handleCancel = () => {
    setOpen(false);
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

  const handleDelete = () => {
    // Filter out the item being deleted
    const filteredServices = services.filter((s) => s.title !== item.title);

    // Update the state with the filtered array
    setServices(filteredServices);
  };

  return (
    <>
      <List.Item
        className="bg-white border border-gray-300 w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
        actions={[
          <CiTrash
            className="text-2xl hover:text-red-500 cursor-pointer"
            onClick={handleDelete}
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
          className="text-gray-800"
          title={
            <span className="font-bold text-lg">
              {`${item.title} ${locale === "he" ? "₪" : "$"}${item.price}`}
            </span>
          }
          description={
            <p className="text-gray-600 text-sm">
              {item.duration} {t("minutes")}
            </p>
          }
        />
      </List.Item>
      <Modal
        title="Edit Service"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <ServiceForm
          locale={locale}
          service={service}
          handleServicesChange={handleServicesChange}
        />
      </Modal>
    </>
  );
};

export default CardItem;

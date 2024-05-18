import React, { ChangeEvent, useCallback, useState } from "react";
import { List, Modal } from "antd";
import { ServiceInput } from "./InitServices";
import { CiEdit, CiTrash } from "react-icons/ci";
import ServiceForm from "./ServiceForm";

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
        className="bg-orange-50 border-slate-950 w-full border-b"
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
          title={`${item.title} ${item.price}₪`}
          description={<p className="text-black">{item.duration} דקות</p>}
          className="border-slate-950"
        />
      </List.Item>
      <Modal
        title="Edit Service"
        open={open}
        onOk={handleOk}
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

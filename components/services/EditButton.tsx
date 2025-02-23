"use client";
import React, {
  ChangeEvent,
  useCallback,
  useState,
  useTransition,
} from "react";
import { List, message, Modal } from "antd";
import { Button } from "@ui/Button";
import { PlusCircleTwoTone, PlusOutlined } from "@ant-design/icons";
import ServiceForm, { ServiceFieldType } from "@ui/Init/ServiceForm";
import { Treatment, User } from "@prisma/client";
import createService from "actions/createService";
import editService from "actions/editService";
import { BiEdit } from "react-icons/bi";
import { locale } from "dayjs";
type NewService = {
  title: string;
  duration: number;
  price: number;
  treatmentId: string;
};

export type ServiceInput = {
  title: string;
  duration: number;
  price: number;
};

const InitServices = ({
  treatment,
  locale,
}: {
  treatment: Treatment;
  locale: string;
}) => {
  const initService: ServiceInput = {
    duration: treatment.duration,
    price: treatment.cost,
    title: treatment.title,
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
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
  const handleOk = useCallback(async () => {
    const params: NewService = { ...service, treatmentId: treatment.id };
    try {
      console.log("service", service);
      setService(initService);
      startTransition(async () => await editService(params));
      message.success("שירות עודכן בהצלחה");
      setOpen(false);
    } catch (err: any) {
      console.log(err);
      message.error("שגיאה בעת עדכון שירות, אנא פנה לתמיכה");
    }
  }, [service]);

  const handleCancel = () => {
    setOpen(false);
    setService(initService);
  };

  return (
    <>
      <Button
        onClick={showModal}
        className="group-hover:bg-slate-100 hover:scale-125 transition-all ease-in-out duration-200 group-hover:text-black rounded-full"
      >
        <BiEdit className="text-2xl" />
      </Button>
      <Modal
        title="New Service"
        open={open}
        onOk={handleOk}
        okButtonProps={{
          className: "bg-blue-600",
          disabled: !service.duration || !service.price || !service.title,
          loading: isPending,
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
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

export default InitServices;

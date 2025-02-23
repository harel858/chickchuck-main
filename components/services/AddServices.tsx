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
import { User } from "@prisma/client";
import createService from "actions/createService";
type NewService = {
  title: string;
  duration: number;
  price: number;
  businessId: string;
  users: User[];
};
export type ServiceInput = {
  title: string;
  duration: number;
  price: number;
};
const initService: ServiceInput = { duration: 0, price: 0, title: "" };
const InitServices = ({
  users,
  businessId,
  locale,
}: {
  users: User[];
  businessId: string;
  locale: string;
}) => {
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
    const params: NewService = { ...service, businessId, users };
    try {
      console.log("service", service);
      setOpen(false);
      setService(initService);
      startTransition(async () => await createService(params));
      message.success("שירות נוסף בהצלחה");
    } catch (err: any) {
      console.log(err);
      message.error("שגיאה בעת הוספת שירות, אנא פנה לתמיכה");
    }
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
        <span>הוסף שירות</span>
        <PlusOutlined className="text-xl" />
      </Button>
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
          locale={locale}
          service={service}
          handleServicesChange={handleServicesChange}
        />
      </Modal>
    </div>
  );
};

export default InitServices;

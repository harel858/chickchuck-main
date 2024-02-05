"use client";
import React, { useEffect, useState } from "react";
import { message, Steps, theme } from "antd";
import { AdditionData } from "./SyncfusionCalendar";
import { Button } from "@ui/Button";
import { motion } from "framer-motion";
import FormFiled from "./FormFiled";
import {
  Account,
  ActivityDays,
  Business,
  Customer,
  Treatment,
  User,
} from "@prisma/client";
import { Session } from "next-auth";
import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";
import NewCustomer from "./NewCustomer";
import LargeHeading from "@ui/LargeHeading";
import { createNewCustomer } from "actions/createCustomer";
import { createAppointment } from "actions/createAppointment";
const NewEvent = ({
  props,
  business,
  session,
  user,
  scheduleObj,
}: {
  scheduleObj: React.RefObject<ScheduleComponent>;
  props: any;
  session: Session;
  business: Business & {
    Customer: Customer[];
  };
  user: User & {
    accounts: Account[];
    Treatment: Treatment[];
    activityDays: ActivityDays[];
    Customer: Customer[];
  };
}) => {
  const [isNewClient, setIsNewClient] = useState(false);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [event, setEvent] = useState<AdditionData | null>(null);
  const [newClient, setNewClient] = useState<{
    name: string;
    phone: string;
  }>({ name: "", phone: "" });
  const [customers, setCustomers] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [services, setServices] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  useEffect(() => {
    const customersList = business.Customer.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    const servicesList = user.Treatment.map((item) => ({
      value: item.id,
      label: item.title,
    }));
    setCustomers(customersList);
    setServices(servicesList);
  }, []);
  const closeEditorTemplate = () => {
    if (scheduleObj.current) {
      scheduleObj.current.closeEditor();
    }
  };

  const createNewClient = async (e: { Name: string; Phone: string }) => {
    try {
      const { Name, Phone } = e;
      const res = await createNewCustomer({
        name: Name,
        phoneNumber: Phone,
        bussinesId: business.id,
      });

      const customersList = res?.Customer.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      console.log("createNewCustomer", res);
      customersList && setCustomers([...customersList]);
      message.success(`${Name} הוסף לרשימה`);
    } catch (err) {
      console.log(err);
      message.error("internal error");
    }
  };
  const next = () => {
    if (isNewClient && current === 0) {
      createNewClient({ Name: newClient.name, Phone: newClient.phone });
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "First",
      content: (
        <FormFiled
          event={event}
          setEvent={setEvent}
          data={customers}
          index={0}
        />
      ),
    },
    {
      title: "Second",
      content: (
        <FormFiled
          event={event}
          setEvent={setEvent}
          data={services}
          index={1}
        />
      ),
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    width: "100%",
    color: token.colorTextTertiary,
    backgroundColor: "rgb(203 213 225)",
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const onSubmit = async (_e: React.FormEvent<HTMLButtonElement>) => {
    try {
      const service = user.Treatment.find(
        (item) => item.id === event?.service?.value
      );

      if (service) {
        const startTime = new Date(props?.StartTime);
        const endTime = new Date(
          startTime.getTime() + service.duration * 60000
        ); // Convert duration to milliseconds

        const eventProps = {
          summary: event?.customer?.label,
          description: event?.service?.label,
          start: {
            dateTime: startTime.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          end: {
            dateTime: endTime.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          extendedProperties: {
            private: {
              treatmentId: event?.service?.value,
              customerId: event?.customer?.value,
            },
          },
        };
        await createAppointment(session.user.access_token, eventProps);
        message.success(`${event?.customer?.label}נקבע תור ל`);
        closeEditorTemplate();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="w-full py-5"
    >
      <Steps current={current} items={items} />

      <div className="flex flex-col justify-center items-center gap-4 mt-4 w-full relative">
        <div
          style={contentStyle}
          className="flex flex-col justify-center items-center py-5"
        >
          <LargeHeading className="text-xl" size={"sm"}>
            {isNewClient && current === 0
              ? "new client"
              : !isNewClient && current === 0
              ? "choose client"
              : current === 1
              ? "choose a service"
              : ""}
          </LargeHeading>
          {isNewClient && current === 0 ? (
            <NewCustomer newClient={newClient} setNewClient={setNewClient} />
          ) : (
            steps[current]?.content
          )}
          {current === 0 && (
            <Button
              onClick={() => setIsNewClient((prev) => !prev)}
              className="text-blue-500"
              variant={"link"}
              type="button"
            >
              {isNewClient ? "back to list" : "new customer?"}
            </Button>
          )}
        </div>
        <div className="flex justify-center items-center gap-3 w-full">
          {current > 0 && (
            <Button
              className={`w-full hover:ring-1 hover:ring-sky-600 hover:text-sky-600`}
              variant={"ghost"}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
          {current == steps.length - 1 ? (
            <Button
              type={"button"}
              onClick={onSubmit}
              className={`bg-sky-600 w-full`}
              size="lg"
            >
              Done
            </Button>
          ) : (
            <Button
              onClick={next}
              type={"button"}
              className={`bg-sky-600 w-full`}
              size="lg"
              disabled={
                (isNewClient && current === 0 && !newClient.name) ||
                (isNewClient && current === 0 && !newClient.phone)
              }
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NewEvent;

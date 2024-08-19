"use client";
import React, { useEffect, useState, useTransition } from "react";
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
import { Schedule, ScheduleComponent } from "@syncfusion/ej2-react-schedule";
import AddCustomer from "@ui/(navbar)/specialOperations/plusButton/Customer";
import LargeHeading from "@ui/LargeHeading";
import { createNewCustomer } from "actions/createCustomer";
import { createAppointment } from "actions/createAppointment";
import { useRouter } from "next/navigation";
const NewEvent = ({
  props,
  business,
  session,
  user,
  ref: scheduleObj,
  ConferenceId,
  access_token,
}: {
  ref: React.RefObject<ScheduleComponent>;
  props: any;
  session: Session;
  business: Business & {
    Customer: Customer[];
    Treatment: Treatment[];
  };
  access_token: string;
  user: User & {
    accounts: Account[];
    Treatment: Treatment[];
    activityDays: ActivityDays[];
    Customer: Customer[];
  };
  ConferenceId: string;
}) => {
  const { token } = theme.useToken();
  const [isPending, startTransition] = useTransition();
  const [isNewClient, setIsNewClient] = useState(false);
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
    const customersList = business?.Customer.map((item) => ({
      value: item.id,
      label: `${item.name} - ${item.phoneNumber}`,
    }));
    const servicesList = business?.Treatment.map((item) => ({
      value: item.id,
      label: item.title,
    }));
    setCustomers(customersList);
    setServices(servicesList);

    // Save props to localStorage if it exists
    if (props?.StartTime) {
      localStorage.setItem("newEventProps", JSON.stringify(props));
    }

    /*    // Cleanup function to remove props from localStorage
    return () => {
      localStorage.removeItem("newEventProps");
    }; */
  }, []);
  const closeEditorTemplate = () => {
    if (scheduleObj.current) {
      scheduleObj.current.closeEditor();
    }
  };

  const next = () => {
    if (isNewClient && current === 0) return setIsNewClient((prev) => !prev);
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "?למי התור",
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
      title: "?איזה טיפול",
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
    let propsToUse = props; // Initialize with props if available

    // If props is not available, retrieve it from localStorage
    if (!propsToUse?.StartTime) {
      const storedProps = localStorage.getItem("newEventProps");
      if (storedProps) {
        propsToUse = JSON.parse(storedProps);
      }
    }

    try {
      const service = business.Treatment.find(
        (item) => item.id === event?.service?.value
      );

      if (service) {
        const startTime = new Date(propsToUse?.StartTime);
        const endTime = new Date(
          startTime.getTime() + service.duration * 60000
        ); // Convert duration to milliseconds
        const customerName = event?.customer?.label.split(" - ")[0];
        const eventProps = {
          summary: event?.service?.label,
          description: "",
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
              treatmentId: event?.service?.value || "",
              customerId: event?.customer?.value || "",
              customerName: customerName || "",
              conferenceId: ConferenceId,
              unread: "true",
            },
          },
        };
        startTransition(
          async () => await createAppointment(access_token, eventProps)
        );
        message.success(`נקבע תור ל${customerName}`);
        closeEditorTemplate();
      }
      // Remove props from localStorage after submission
      localStorage.removeItem("newEventProps");
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
            {!isNewClient && current === 0
              ? "בחירת לקוח"
              : current === 1
              ? "בחירת סוג שירות"
              : ""}
          </LargeHeading>
          {isNewClient && current === 0 ? (
            <AddCustomer
              handleCancel={next}
              isHidden={false}
              business={business}
            />
          ) : (
            steps[current]?.content
          )}
          {current === 0 && (
            <Button
              onClick={() => setIsNewClient((prev) => !prev)}
              className="text-blue-500 focus:ring-0 focus:ring-offset-0"
              variant={"link"}
              type="button"
              style={{ direction: "rtl" }}
            >
              {isNewClient ? "חזרה לרשימת הלקוחות" : "לקוח חדש?"}
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
              חזור
            </Button>
          )}
          {current == steps.length - 1 ? (
            <Button
              type={"button"}
              onClick={onSubmit}
              className={`bg-sky-600 w-full`}
              size="lg"
              isLoading={isPending}
            >
              קבע תור
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
              הבא
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default React.forwardRef((props: any, ref: React.Ref<Schedule>) => (
  <NewEvent {...props} />
));

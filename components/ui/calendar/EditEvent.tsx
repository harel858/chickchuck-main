import React, { useEffect, useState, useMemo } from "react";
import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";
import { Session } from "next-auth";
import {
  Account,
  ActivityDays,
  Business,
  Customer,
  Treatment,
  User,
} from "@prisma/client";
import { motion } from "framer-motion";
import LargeHeading from "@ui/LargeHeading";
import { theme } from "antd";
import { Button } from "@ui/Button";
import EditFormField from "./EditFormField";

export type EditProps = {
  EndTime: string;
  ExtendedProperties: {
    private: {
      customerId: string;
      treatmentId: string;
    };
  };
  Guid: string;
  Id: string;
  IsAllDay: boolean;
  StartTime: string;
  Subject: string;
  description: string;
  status: string;
};

export type EditData = {
  service: { label: string; value: string };
  customer: { label: string; value: string };
  StartTime: string;
  EndTime: string;
  description: string;
};

function EditEvent({
  props,
  business,
  session,
  user,
  scheduleObj,
  setEditEvent,
}: {
  scheduleObj: React.RefObject<ScheduleComponent>;
  props: EditProps;
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
  setEditEvent: React.Dispatch<React.SetStateAction<string | null>>;
  editEvent: string | null;
}) {
  const [customers, setCustomers] = useState<
    { value: string; label: string }[]
  >([]);
  const [services, setServices] = useState<{ value: string; label: string }[]>(
    []
  );
  const [event, setEvent] = useState<EditData | null>(null);
  console.log("event", event);

  useEffect(() => {
    const customersList = business.Customer.map((item) => ({
      value: item.id,
      label: `${item.name} - ${item.phoneNumber}`,
    }));
    const servicesList = user.Treatment.map((item) => ({
      value: item.id,
      label: item.title,
    }));
    const customer = customersList.find(
      (item) => item.value === props?.ExtendedProperties?.private?.customerId
    );
    const service = servicesList.find(
      (item) => item.value === props?.ExtendedProperties?.private?.treatmentId
    );
    setCustomers(customersList);
    setServices(servicesList);
    // Only update the event state if it has changed
    if (
      JSON.stringify(event) !==
      JSON.stringify({
        customer: customer!,
        service: service!,
        StartTime: props.StartTime,
        EndTime: props.EndTime,
        description: props.description,
      })
    ) {
      setEvent({
        customer: customer!,
        service: service!,
        StartTime: props.StartTime,
        EndTime: props.EndTime,
        description: props.description,
      });
    }
  }, [props, business.Customer, user.Treatment]);

  const { token } = theme.useToken();

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    width: "100%",
    color: token.colorTextTertiary,
    backgroundColor: "rgb(203 213 225)",
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
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
      <div className="flex flex-col justify-center items-center gap-4 mt-4 w-full relative">
        <div
          style={contentStyle}
          className="flex flex-col justify-center items-center py-5 gap-4"
        >
          <LargeHeading className="text-xl" size={"sm"}>
            Edit Event
          </LargeHeading>
          <EditFormField
            customers={customers}
            services={services}
            scheduleObj={scheduleObj}
            props={props}
            setEvent={setEvent}
            event={event}
          />
        </div>
        <Button
          className={`w-full hover:ring-1 hover:ring-sky-600 hover:text-sky-600`}
          variant={"default"}
        >
          Save
        </Button>
      </div>
    </motion.div>
  );
}

export default EditEvent;

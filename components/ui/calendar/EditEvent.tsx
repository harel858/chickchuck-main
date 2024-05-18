import React, { useEffect, useState, useTransition } from "react";
import { Schedule, ScheduleComponent } from "@syncfusion/ej2-react-schedule";
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
import { message, theme } from "antd";
import { Button } from "@ui/Button";
import EditFormField from "./EditFormField";
import { EditProps } from "types/types";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { EventProps } from "actions/createAppointment";
import { updateEvent } from "actions/updateEvent";

export type EditData = {
  service: { label: string; value: string };
  customer: { label: string; value: string };
  StartTime: string;
  EndTime: string;
  descripition: string;
};

function EditEvent({
  props,
  business,
  session,
  user,
  ref: scheduleObj,
  conferenceId,
}: {
  ref: React.RefObject<ScheduleComponent>;
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
  conferenceId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [customers, setCustomers] = useState<
    { value: string; label: string }[]
  >([]);
  const [services, setServices] = useState<{ value: string; label: string }[]>(
    []
  );
  const [editEvent, setEditEvent] = useState<EditData | null>(null);

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
    /*   if (
      JSON.stringify(event) !==
      JSON.stringify({
        customer: customer!,
        service: service!,
        StartTime: props.StartTime,
        EndTime: props.EndTime,
        description: props.description,
      })
    ) { */
    setEditEvent({
      customer: customer!,
      service: service!,
      StartTime: props.StartTime,
      EndTime: props.EndTime,
      descripition: props.descripition || "",
    });
    /*  } */
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

  const closeEditorTemplate = () => {
    if (scheduleObj.current) {
      scheduleObj.current.closeEditor();
    }
  };

  const onSaveUpdate = (props: EditProps) => {
    let data = new DataManager(
      scheduleObj?.current?.getCurrentViewEvents()
    ).executeLocal(new Query().where("RecurrenceID", "equal", props.Id));

    const eventProps: EventProps & { id: string } = {
      id: props.Id,
      summary: editEvent?.customer?.label || "",
      description: editEvent?.descripition || "",
      start: {
        dateTime: editEvent?.StartTime || "",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: editEvent?.EndTime || "",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      extendedProperties: {
        private: {
          treatmentId: editEvent?.service?.value || "",
          customerId: editEvent?.customer?.value || "",
          customerName: editEvent?.customer?.value.split("-")[0] || "",
          conferenceId: conferenceId || "primary",
        },
      },
    };
    startTransition(
      async () =>
        await updateEvent(session.user.access_token, eventProps, conferenceId)
    );
    message.success(`${eventProps?.summary}נערך התור ל`);
    closeEditorTemplate();
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
            עריכת אירוע
          </LargeHeading>
          <EditFormField
            customers={customers}
            services={services}
            scheduleObj={scheduleObj}
            props={props}
            setEvent={setEditEvent}
            event={editEvent}
          />
        </div>
        <Button
          className={`w-full hover:ring-1 hover:ring-sky-600 hover:text-sky-600`}
          variant={"default"}
          onClick={() => onSaveUpdate(props)}
        >
          Save
        </Button>
      </div>
    </motion.div>
  );
}

export default React.forwardRef((props: any, ref: React.Ref<Schedule>) => (
  <EditEvent {...props} />
));

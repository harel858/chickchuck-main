"use client";
import React, { useState, useTransition } from "react";
import { message, Steps, theme } from "antd";
import { Session } from "next-auth";
import { motion } from "framer-motion";
import { Button } from "@ui/Button";
import AppointmentField from "../FormField";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  appointmentValidation,
  TAppointmentValidation,
} from "@lib/validators/AppointmentValidation";
import { useForm } from "react-hook-form";
import { Form } from "@ui/form";
import AddCustomer from "../Customer";
import {
  Account,
  ActivityDays,
  Business,
  Customer,
  Treatment,
  User,
} from "@prisma/client";

import { createAppointment } from "actions/createAppointment";

const AppointmentSteps = ({
  session,
  handleCancel2,
  user,
  business,
}: {
  session: Session;
  business: Business & {
    Customer: Customer[];
  };
  handleCancel2?: () => void;
  user: User & {
    accounts: Account[];
    Treatment: Treatment[];
    activityDays: ActivityDays[];
    Customer: Customer[];
  };
}) => {
  const [isPending, startTransition] = useTransition();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [isNewClient, setIsNewClient] = useState(false);
  const form = useForm<TAppointmentValidation>({
    resolver: zodResolver(appointmentValidation),
    defaultValues: {
      Date: dayjs().toISOString(),
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    getValues,
  } = form;
  const data = getValues();
  const onSubmit = async (data: TAppointmentValidation) => {
    try {
      const customerName = data?.Client?.label.split(" - ")[0];
      const eventProps = {
        summary: data.Client.label,
        description: "",
        start: {
          dateTime: data.slot.start, // Date.toISOString() ->
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
        },
        end: {
          dateTime: data.slot.end, // Date.toISOString() ->
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
        },
        extendedProperties: {
          private: {
            treatmentId: data?.Service?.value || "",
            customerId: data?.Client?.value || "",
            customerName: customerName || "",
          },
        },
      };
      startTransition(
        async () =>
          await createAppointment(session.user.access_token, eventProps)
      );

      form.reset({
        Date: dayjs().toISOString(),
        // Add other default values for your form fields
      });
      setCurrent(0);
      handleCancel2 && handleCancel2();
      return message.success("The appointment was created successfully");
    } catch (err: any) {
      message.error("Internal error");
      console.log("err", err);
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const switchIsNewClient = () => setIsNewClient((prev) => !prev);
  const steps = [
    {
      title: "For Who?",
      content: (
        <div>
          <AppointmentField
            getValues={getValues}
            errors={errors}
            register={register}
            control={control}
            name={"Client"}
            label={"For who?"}
            key={"For Who"}
            session={session}
            user={user}
            business={business}
          />
          <Button
            onClick={switchIsNewClient}
            className="text-blue-500 focus:ring-0 focus:ring-offset-0"
            variant={"link"}
            type="button"
          >
            {!isNewClient ? "?לקוח/ה חדש/ה" : "?לקוח קיים"}
          </Button>
        </div>
      ),
    },
    {
      title: "Second",
      content: (
        <AppointmentField
          business={business}
          getValues={getValues}
          errors={errors}
          register={register}
          control={control}
          name={"Service"}
          label={"Pick A Service"}
          key={"Pick A Service"}
          session={session}
          user={user}
        />
      ),
    },
    {
      title: "Last",
      content: (
        <AppointmentField
          business={business}
          errors={errors}
          register={register}
          control={control}
          getValues={getValues}
          name={"Date"}
          label={"When Do You Want"}
          key={"When Do You Want"}
          session={session}
          user={user}
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
      {isNewClient ? (
        <div
          style={contentStyle}
          className="flex flex-col justify-center items-center py-5"
        >
          <AddCustomer
            isHidden={true}
            handleCancel={switchIsNewClient}
            business={business}
          />
          <Button
            onClick={switchIsNewClient}
            className="text-blue-500 focus:ring-0 focus:ring-offset-0"
            variant={"link"}
            type="button"
          >
            {!isNewClient ? "?לקוח/ה חדש/ה" : "?לקוח קיים"}
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form
            className="flex flex-col justify-center items-center gap-4 mt-4 w-full relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div
              style={contentStyle}
              className="flex justify-center items-center py-5"
            >
              {steps[current]?.content}
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
                  type={"submit"}
                  onSubmit={handleSubmit(onSubmit)}
                  className={`bg-sky-600 w-full`}
                  size="lg"
                  disabled={
                    (current === 2 && !data.Date) ||
                    (current === 2 && !data.slot)
                  }
                  isLoading={isSubmitting}
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
                    (current === 0 && !data.Client) ||
                    (current === 1 && !data.Service)
                  }
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}
    </motion.div>
  );
};

export default AppointmentSteps;

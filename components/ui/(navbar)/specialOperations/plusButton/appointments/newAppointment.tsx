"use client";
import React, { useCallback, useState } from "react";
import { message, Modal, Steps, theme } from "antd";
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
import Customer from "../Customer";

const AppointmentSteps = ({
  session,
  handleCancel2,
}: {
  session: Session;
  handleCancel2: () => void;
}) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModaOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
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

  const getAvailableTimeSlots = (
    durationInMinutes: number,
    month: string,
    busySlots: { start: string; end: string }[]
  ) => {
    const availableSlots = [];
    const startOfMonth = dayjs(month).startOf("month");
    const endOfMonth = dayjs(month).endOf("month");

    let currentSlotStart = startOfMonth;

    // Loop through the month in slots of the specified duration
    while (currentSlotStart.isBefore(endOfMonth)) {
      const currentSlotEnd = currentSlotStart.add(durationInMinutes, "minutes");

      // Check if the current slot is not within any busy slot
      const isSlotAvailable = busySlots.every((busySlot) => {
        const busyStart = dayjs(busySlot.start);
        const busyEnd = dayjs(busySlot.end);
        return (
          currentSlotEnd.isBefore(busyStart) ||
          currentSlotEnd.isSame(busyStart) ||
          currentSlotStart.isAfter(busyEnd) ||
          currentSlotStart.isSame(busyEnd)
        );
      });

      if (isSlotAvailable) {
        availableSlots.push({
          start: currentSlotStart.toISOString(),
          end: currentSlotEnd.toISOString(),
        });
      }

      // Move to the next slot
      currentSlotStart = currentSlotStart.add(durationInMinutes, "minutes");
    }

    return availableSlots;
  };

  const onSubmit = async (data: TAppointmentValidation) => {
    console.log("data", data);

    try {
      const event = {
        summary: data.Client.label,
        description: data.Service.label,
        start: {
          dateTime: data.slot.start, // Date.toISOString() ->
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
        },
        end: {
          dateTime: data.slot.end, // Date.toISOString() ->
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
        },
      };
      const res = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + `${session.user.access_token}`,
          },
          body: JSON.stringify(event),
        }
      );
      const result: any = await res.json();
      if (result.id) {
        form.reset({
          Date: dayjs().toISOString(),
          // Add other default values for your form fields
        });
        setCurrent(0);
        handleCancel2();
        return message.success("The appointment was created successfully");
      }
      message.error("Internal error");
    } catch (err: any) {
      console.log("err", err);
      message.error("Internal error");
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleOk = useCallback(() => {
    setModaOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setModaOpen(false);
  }, [modalOpen]);

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
          />
          <Button
            onClick={() => setModaOpen(true)}
            className="text-blue-500"
            variant={"link"}
            type="button"
          >
            New Customer?
          </Button>
          <Modal
            title="New Client"
            open={modalOpen}
            onOk={handleOk}
            okButtonProps={{
              className: "hidden",
            }}
            cancelButtonProps={{ className: "hidden" }}
            confirmLoading={true}
            onCancel={handleCancel}
          >
            <Customer
              handleCancel={handleCancel}
              bussinesId={session.user.business?.id || null}
            />
          </Modal>
        </div>
      ),
    },
    {
      title: "Second",
      content: (
        <AppointmentField
          getValues={getValues}
          errors={errors}
          register={register}
          control={control}
          name={"Service"}
          label={"Pick A Service"}
          key={"Pick A Service"}
          session={session}
        />
      ),
    },
    {
      title: "Last",
      content: (
        <AppointmentField
          errors={errors}
          register={register}
          control={control}
          getValues={getValues}
          name={"Date"}
          label={"When Do You Want"}
          key={"When Do You Want"}
          session={session}
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
                  (current === 2 && !data.Date) || (current === 2 && !data.slot)
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
    </motion.div>
  );
};

export default AppointmentSteps;

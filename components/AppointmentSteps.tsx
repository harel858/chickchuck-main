"use client";
import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import MobileStepperMUI from "./MobileStepperMUI";
import ServicesList from "./ServicesList";
import ChooseDate from "./ChooseDate";
import Verification from "./Verification";
import UserList from "./UserList";
import SlotsList from "./SlotsList";
import CodeVerification from "./CodeVerification";
import ThankYouPage from "./ThankYouPage";
import {
  ActivityDays,
  AppointmentRequest,
  Business,
  Customer,
  Images,
  Treatment,
  User,
} from "@prisma/client";
import { Button } from "@ui/Button";
import dayjs, { Dayjs } from "dayjs";
import { calendar_v3 } from "googleapis";
import { TUserValidation } from "@lib/validators/userValidation";
import { message } from "antd";
import { Session } from "next-auth";
import CustomerSignIn from "./landingPage/CustomerSignIn";
import CustomerAppointments from "./landingPage/CustomerAppointments";
export default function AppointmentSteps({
  business,
  freeBusy,
  session,
  customerAppointments,
  freebusy,
}: {
  business: Business & {
    Treatment: Treatment[];
    Images: Images[];
    activityDays: ActivityDays[];
    user: User[];
  };
  freeBusy: string;
  session: Session | null;
  freebusy: string;
  customerAppointments:
    | (
        | calendar_v3.Schema$Event
        | (AppointmentRequest & {
            treatment: Treatment;
            customer: Customer;
            user: User;
          })
      )[]
    | null
    | undefined;
}) {
  console.log("business.confirmationNeeded", business.confirmationNeeded);

  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedService, setSelectedService] =
    React.useState<Treatment | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(dayjs());
  const [slots, setSlots] = React.useState<calendar_v3.Schema$TimePeriod[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [slotsForMonth, setSlotsForMonth] = React.useState<Record<
    string,
    calendar_v3.Schema$TimePeriod[]
  > | null>(null);

  const setLoadingState = useCallback(
    (bool: boolean) => {
      setIsLoading(bool);
    },
    [isLoading, setIsLoading]
  );

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === 0 && business.user.length < 2)
        return prevActiveStep + 2;

      return prevActiveStep + 1;
    });
  }, [business.user.length, setActiveStep]);

  const onSelectedUser = useCallback(
    (user: User) => {
      setSelectedUser(user);
      handleNext();
    },
    [selectedUser, setSelectedUser]
  );
  const [customerInput, setCustomerInput] = useState<
    (TUserValidation & { request_id: string }) | null
  >(null);
  const [selectedSlot, setSelectedSlot] =
    React.useState<calendar_v3.Schema$TimePeriod | null>(null);

  const onSetCustomerInput = useCallback(
    (input: TUserValidation & { request_id: string }) => {
      setCustomerInput(input);
      handleNext();
    },
    [customerInput, setCustomerInput]
  );

  const onSelectedSlot = useCallback(
    (slot: calendar_v3.Schema$TimePeriod) => {
      setSelectedSlot(slot);
      handleNext();
    },
    [selectedSlot, setSelectedSlot]
  );
  const onSlots = useCallback(
    (slots: calendar_v3.Schema$TimePeriod[]) => setSlots(slots),
    [slots, setSlots]
  );
  const onSlotsForMonth = useCallback(
    (slots: Record<string, calendar_v3.Schema$TimePeriod[]>) =>
      setSlotsForMonth(slots),
    [slotsForMonth, setSlotsForMonth]
  );
  const onSelectedService = useCallback(
    (service: Treatment) => setSelectedService(service),
    [selectedService, setSelectedService]
  );

  const onSelectedDate = useCallback(
    (date: Dayjs) => {
      const monthChanged =
        selectedDate.add(1, "month").format("DD/MM/YYYY") ===
          date.format("DD/MM/YYYY") ||
        selectedDate.add(-1, "month").format("DD/MM/YYYY") ===
          date.format("DD/MM/YYYY") ||
        date.isAfter(selectedDate, "month");
      const yearChanged =
        selectedDate.add(1, "month").format("DD/MM/YYYY") ===
          date.format("DD/MM/YYYY") ||
        selectedDate.add(-1, "month").format("DD/MM/YYYY") ===
          date.format("DD/MM/YYYY");

      if (date.isBefore(dayjs(), "month"))
        return message.error("לא ניתן לחזור אל העבר");
      if (monthChanged || yearChanged) return setSelectedDate(date);

      setSelectedDate(date);
      handleNext();
    },
    [selectedDate, setSelectedDate]
  );

  const handleBack = useCallback(() => {
    if (activeStep > 1) setActiveStep(1);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, [setActiveStep, activeStep]);
  console.log("activityDays", business.activityDays);

  const steps = [
    {
      title: "?מה בא לך",
      content: (
        <ServicesList
          services={business.Treatment}
          onSelectedService={onSelectedService}
          selectedService={selectedService}
        />
      ),
    },
    {
      title: "?אצל מי",
      content: (
        <UserList
          users={business.user}
          onSelectedUser={onSelectedUser}
          selectedUser={selectedUser}
        />
      ),
    },
    {
      title: "?מתי נוח לך",
      content: (
        <ChooseDate
          onSelectedDate={onSelectedDate}
          selectedService={selectedService}
          selectedDate={selectedDate}
          activityDays={business.activityDays}
          freeBusy={freeBusy}
          onSlots={onSlots}
          allSlots={slots}
          onSlotsForMonth={onSlotsForMonth}
          slotsForMonth={slotsForMonth}
          calendarId={selectedUser?.calendarId || "primary"}
        />
      ),
    },
    {
      title: "אימות קצרצר",
      content: (
        <SlotsList
          slotsForMonth={slotsForMonth}
          selectedDate={selectedDate}
          onSelectedSlot={onSelectedSlot}
          selectedSlot={selectedSlot}
        />
      ),
    },
    {
      title: "אימות",
      content: (
        <Verification
          selectedService={selectedService}
          selectedSlot={selectedSlot}
          onSetCustomerInput={onSetCustomerInput}
          selectedUser={selectedUser || business.user[0]!}
        />
      ),
    },
    {
      title: "אימות",
      content: (
        <CodeVerification
          confirmationNeeded={business.confirmationNeeded}
          selectedService={selectedService}
          selectedSlot={selectedSlot}
          customerInput={customerInput}
          freeBusy={freeBusy}
          handleNext={handleNext}
          bussinesId={business.id}
          selectedUser={selectedUser || business.user[0]!}
        />
      ),
    },
    {
      title: "אימות",
      content: (
        <ThankYouPage
          confirmationNeeded={business.confirmationNeeded}
          selectedService={selectedService}
          selectedSlot={selectedSlot}
          selectedUser={selectedUser || business.user[0]!}
        />
      ),
    },
  ];

  return (
    <div className="relative w-1/3 max-md:w-11/12 flex flex-col justify-center items-center bg-slate-200 rounded-xl mb-20">
      {!session ? (
        <CustomerSignIn />
      ) : (
        <CustomerAppointments
          freebusy={freebusy}
          customerAppointments={customerAppointments}
        />
      )}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MobileStepperMUI
          stepsLength={steps.length}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
        />
        <div className="w-full">{steps[activeStep]?.content}</div>
      </Box>
      {selectedService && activeStep === 0 ? (
        <Button
          isLoading={isLoading}
          disabled={activeStep >= steps.length}
          onClick={() => handleNext()}
          className="bg-blue-600 text-2xl fixed bottom-10 w-1/3 max-md:w-full transition-all ease-in-out duration-300"
        >
          המשך
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}

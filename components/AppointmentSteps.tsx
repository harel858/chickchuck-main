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
import {
  Progress,
  ProgressIndicator,
  Root,
  Indicator,
} from "@radix-ui/react-progress";
import dayjs, { Dayjs } from "dayjs";
import { calendar_v3 } from "googleapis";
import { TUserValidation } from "@lib/validators/userValidation";
import { message } from "antd";
import { Session } from "next-auth";
import CustomerSignIn from "./landingPage/CustomerSignIn";
import CustomerAppointments from "./landingPage/CustomerAppointments";
import { useTranslations } from "next-intl";
import { Button } from "@ui/Button";
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
  const t = useTranslations("createbusinessdetails");
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedService, setSelectedService] =
    React.useState<Treatment | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(dayjs());
  const [slots, setSlots] = React.useState<calendar_v3.Schema$TimePeriod[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [progress, setProgress] = useState(75);
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
    (service: Treatment) => {
      setSelectedService(service);
      handleNext();
    },
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
          businessName={business.businessName}
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
  console.log("session", session);
  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "2rem 0 2rem 0",
    borderRadius: "10px 10px 10px 10px",
    width: "100%",
  };

  return (
    <div className="w-1/2 max-md:w-10/12 gap-0 flex flex-col justify-center items-center p-4 rounded-xl shadow-lg shadow-black/50 bg-slate-200">
      {/* {stepsInitialized && (
        <Steps
          direction="horizontal"
          current={current}
          items={items}
          responsive
          className="mt-4"
        />
      )} */}
      <Root
        className="relative h-[25px] w-11/12 md:w-[300px] overflow-hidden rounded-full bg-purple-500/50"
        style={{
          // Fix overflow clipping in Safari
          // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
          transform: "translateZ(0)",
        }}
        value={progress}
      >
        <Indicator
          className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] size-full bg-white transition-transform duration-[660ms]"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Root>
      <div
        style={contentStyle}
        className="flex flex-col justify-center items-center text-black w-full"
      >
        {steps[activeStep]?.content}
      </div>
      <div className="mt-2 space-x-4">
        {/*  {activeStep > 0 && (
          <Button className="hover:bg-white/30" onClick={() => handleBack()}>
            {t("back")}
          </Button>
        )}
        {activeStep < steps.length - 1 && activeStep != 0 && (
          <Button className="bg-slate-950" onClick={() => handleNext()}>
            {t("next")}
          </Button>
        )}
        {selectedService && activeStep === 0 ? (
          <Button
            isLoading={isLoading}
            disabled={activeStep >= steps.length}
            onClick={() => handleNext()}
            className="bg-slate-950 text-2xl w-full transition-all ease-in-out duration-300 z-50"
          >
            המשך
          </Button>
        ) : (
          <></>
        )} */}
      </div>
    </div>
  );
}

"use client";
import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import MobileStepperMUI from "./MobileStepperMUI";
import ServicesList from "./ServicesList";
import ChooseDate from "./ChooseDate";
import Verification from "./Verification";
import SlotsList from "./SlotsList";
import CodeVerification from "./CodeVerification";
import ThankYouPage from "./ThankYouPage";
import {
  ActivityDays,
  Business,
  Images,
  Treatment,
  User,
} from "@prisma/client";
import { Button } from "@ui/Button";
import dayjs, { Dayjs } from "dayjs";
import { calendar_v3 } from "googleapis";
import { TUserValidation } from "@lib/validators/userValidation";

export default function AppointmentSteps({
  business,
  freeBusy,
}: {
  business: Business & {
    Treatment: Treatment[];
    Images: Images[];
    activityDays: ActivityDays[];
    user: User[];
  };
  freeBusy: string;
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedService, setSelectedService] =
    React.useState<Treatment | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(dayjs());
  const [slots, setSlots] = React.useState<calendar_v3.Schema$TimePeriod[]>([]);
  const [slotsForMonth, setSlotsForMonth] = React.useState<Record<
    string,
    calendar_v3.Schema$TimePeriod[]
  > | null>(null);
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
      if (
        selectedDate.add(1, "month").format("DD/MM/YYYY") ===
          date.format("DD/MM/YYYY") ||
        selectedDate.add(-1, "month").format("DD/MM/YYYY") ===
          date.format("DD/MM/YYYY")
      )
        return setSelectedDate(date);

      setSelectedDate(date);
      handleNext();
    },
    [selectedDate, setSelectedDate]
  );
  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [setActiveStep, activeStep]);

  const handleBack = useCallback(() => {
    if (activeStep > 1) setActiveStep(1);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, [setActiveStep, activeStep]);

  const steps = [
    {
      title: "סוג השירות",
      content: (
        <ServicesList
          services={business.Treatment}
          onSelectedService={onSelectedService}
          selectedService={selectedService}
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
        />
      ),
    },
    {
      title: "אימות",
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
        />
      ),
    },
    {
      title: "אימות",
      content: (
        <CodeVerification
          selectedService={selectedService}
          selectedSlot={selectedSlot}
          customerInput={customerInput}
          freeBusy={freeBusy}
          handleNext={handleNext}
          bussinesId={business.id}
        />
      ),
    },
    {
      title: "אימות",
      content: (
        <ThankYouPage
          selectedService={selectedService}
          selectedSlot={selectedSlot}
        />
      ),
    },
  ];

  return (
    <div className="relative w-1/3 max-md:w-11/12 flex flex-col justify-center items-center bg-slate-200 rounded-xl mb-20">
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
          disabled={activeStep >= steps.length}
          onClick={() => handleNext()}
          className="bg-blue-600 text-2xl fixed bottom-10 w-1/3 max-md:w-full transition-all ease-in-out duration-300"
        >
          Next
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}

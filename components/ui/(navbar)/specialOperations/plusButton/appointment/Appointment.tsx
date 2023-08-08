"use client";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import AvailableList from "./AvailableList";
import { Button } from "@ui/Button";
import { NotificationPlacement } from "antd/es/notification/interface";
import { notification } from "antd";
import { AppointmentInput, BusinessData } from "types/types";
import WithWho from "@components/landingPage/finals/steps/WithWho";
import ForWhat from "./ForWhat";

function Appointment({ businessData }: { businessData: BusinessData }) {
  // Get the user session
  const { data: session } = useSession();
  const { usersData } = businessData;

  const [api, contextHolder] = notification.useNotification();

  // Initialize the state with an object directly
  const [appointmentInput, setAppointmentInput] = useState<AppointmentInput>({
    treatment: null,
    availableSlot: [],
    user: usersData[0] && usersData.length == 1 ? usersData[0] : null,
    date: dayjs(),
  });
  const [treatmentMissing, setTreatmentMissing] = useState("");
  const [recipientMissing, setRecipientMissing] = useState("");
  const [loading, setLoading] = useState(false);
  const successNotification = (placement: NotificationPlacement) => {
    api.success({
      message: `Notification ${placement}`,
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement,
    });
  };
  console.log("appointmentInput.user", appointmentInput.user);

  const errorNotification = (placement: NotificationPlacement) => {
    api.error({
      message: `Notification ${placement}`,
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement,
    });
  };
  const handleSubmit = async () => {
    setLoading(true);

    // Proceed only if both treatment and recipient are selected
    if (!appointmentInput.treatment || !appointmentInput.user) return;

    try {
      const res = await axios.post("api/appointments", {
        ...appointmentInput,
        customerId: session?.user.id,
      });
      if (res.status == 200) {
        setLoading(false);
        successNotification("bottom");
      }
      // Do something with the response if needed
    } catch (err) {
      setLoading(false);
      errorNotification("bottom");
      console.log(err);
    }
  };

  return (
    <>
      <div className="max-md:w-full flex flex-col justify-start content-center items-center gap-5 p-5">
        <div className="flex max-md:flex-col justify-center items-center gap-5">
          {usersData.length > 1 ? (
            <WithWho
              userData={usersData}
              setAppointmentInput={setAppointmentInput}
              appointmentInput={appointmentInput}
              recipientMissing={recipientMissing} // Use the combined state
            />
          ) : (
            <></>
          )}
          <ForWhat
            setAppointmentInput={setAppointmentInput}
            appointmentInput={appointmentInput}
            treatmentMissing={treatmentMissing} // Use the combined state
          />
        </div>
        <AvailableList
          appointmentInput={appointmentInput}
          setAppointmentInput={setAppointmentInput}
          activityDays={businessData.business.activityDays}
          setTreatmentMissing={setTreatmentMissing}
          setRecipientMissing={setRecipientMissing}
        />
        <div className="flex flex-col justify-center items-center gap-1">
          {recipientMissing && treatmentMissing ? (
            <p className="text-red-500 font-serif text-lg font-medium">
              Recipient And Treatment Are Missing!
            </p>
          ) : recipientMissing ? (
            <p className="text-red-500 font-serif text-lg font-medium">
              {recipientMissing}!
            </p>
          ) : (
            treatmentMissing && (
              <p className="text-red-500 font-serif text-lg font-medium">
                {treatmentMissing}!
              </p>
            )
          )}
        </div>
        <Button
          variant="default"
          className="w-max  bg-sky-600 hover:bg-slate-900 dark:bg-sky-800 text-xl rounded-xl max-2xl:w-11/12 tracking-widest"
          disabled={appointmentInput.availableSlot.length === 0}
          onClick={handleSubmit}
          isLoading={loading}
        >
          Book Now
        </Button>
      </div>
      {contextHolder}
    </>
  );
}

export default Appointment;

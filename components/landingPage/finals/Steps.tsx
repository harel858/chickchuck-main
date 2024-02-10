"use client";
import { useState } from "react";
import AvailableList from "../AvailableList";
import { AppointmentInput, BusinessData, UserData } from "../../../types/types";
import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import WithWho from "./steps/WithWho";
import ForWhat from "./steps/ForWhat";
import { Button } from "@ui/Button";
import { NotificationPlacement } from "antd/es/notification/interface";
import { notification } from "antd";
import { Business, Customer, Treatment, User } from "@prisma/client";

function Steps({
  businessData,
}: {
  businessData: {
    usersData: UserData[];
    business: Business & {
      user: (User & {
        Treatment: Treatment[];
      })[];
      Customer: Customer[];
    };
  };
}) {
  const { usersData } = businessData;
  // Get the user session
  const { data: session } = useSession();
  const [api, contextHolder] = notification.useNotification();

  // Initialize the state with an object directly
  const [appointmentInput, setAppointmentInput] = useState<AppointmentInput>({
    treatment: null,
    availableSlot: [],
    user: usersData[0] && usersData.length == 1 ? usersData[0] : null,
    date: dayjs(),
    customerId: session?.user.id,
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
      <div className="w-1/2 max-md:w-full flex flex-col justify-center content-center items-center gap-5 p-5 bg-slate-100 rounded-xl max-xl:rounded-t-none shadow-sm shadow-black border-x border-b border-gray-500">
        <h2 className={`text-slate-900 font-normal font-serif text-2xl`}>
          Book An Appointment
        </h2>
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
        {/*  <AvailableList
          appointmentInput={appointmentInput}
          setAppointmentInput={setAppointmentInput}
          usersData={usersData}
          businessActivityDays={businessData.business.activityDays}
          setTreatmentMissing={setTreatmentMissing}
          setRecipientMissing={setRecipientMissing}
        /> */}
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
          <Button
            disabled={appointmentInput.availableSlot.length === 0}
            onClick={handleSubmit}
            isLoading={loading}
            className={`hover:bg-green-700 ${loading ? "bg-green-700" : ""}`}
          >
            Book Now
          </Button>
        </div>
      </div>
      {contextHolder}
    </>
  );
}

export default Steps;

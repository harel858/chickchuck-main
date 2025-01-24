"use server";
import { setupGoogleCalendarClient } from "@lib/google/client";
import { addNumberToCL, createNewCL } from "@lib/whatsapp/creatNewCl";
import { sendWhatsAppMessage } from "@lib/whatsapp/sendWhatsAppMessage";
import { Customer, Treatment, User } from "@prisma/client";
import dayjs from "dayjs";
import { calendar_v3 } from "googleapis";
import { revalidatePath } from "next/cache";

export type EventProps = {
  summary: string | undefined;
  description: string | undefined;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  extendedProperties: {
    private: {
      treatmentId: string;
      customerId: string;
      customerName: string;
      conferenceId: string;
    };
  };
};

export async function createAppointment3(
  access_token: string,
  selectedService: Treatment,
  selectedSlot: calendar_v3.Schema$TimePeriod,
  selectedUser: User,
  client: Customer,
  businessName: string,
  locale: string
) {
  const calendarId = selectedUser.calendarId || "primary";
  const eventProps: EventProps = {
    summary: selectedService?.title,
    description: "",
    start: {
      dateTime: selectedSlot?.start || "", // Date.toISOString() ->
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
    },
    end: {
      dateTime: selectedSlot?.end || "", // Date.toISOString() ->
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
    },
    extendedProperties: {
      private: {
        treatmentId: selectedService?.id || "",
        customerId: client.id || "",
        customerName: client.name || "",
        conferenceId: selectedUser.calendarId || "primary",
      },
    },
  };

  try {
    const googleClient = setupGoogleCalendarClient(access_token);

    const { auth, calendar } = googleClient;

    const result = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      requestBody: {
        ...eventProps,
        extendedProperties: {
          private: { ...eventProps.extendedProperties.private },
        },
      },
    });
    const twoHoursBefore = dayjs(selectedSlot?.start)
      .add(-2, "hours")
      .format("DD/MM/YYYY HH:mm");
    const lastNineDigits = client.phoneNumber.slice(-9);
    console.log("lastNineDigits", lastNineDigits);
    const formattedBusinessName = businessName.replace(/\s+/g, "-"); // Replace whitespace with hyphens
    const appointmentTime = dayjs(selectedSlot?.start).format(
      "DD/MM/YYYY HH:mm"
    );
    console.log("client.clId", client.clId);
    let clId = client.clId;
    console.log("clId", clId);

    if (client.clId) {
      clId = await addNumberToCL(
        {
          lastNineDigits,
          businessName: businessName,
          name: client.name,
          treatment: selectedService.title,
          time: appointmentTime,
          dynamicLink: `https://www.quickline.co.il/${locale}/${formattedBusinessName}`,
        },
        client.clId
      );
    } else {
      clId = await createNewCL(
        {
          lastNineDigits: lastNineDigits,
          businessName,
          name: client.name,
          treatment: selectedService.title,
          time: appointmentTime,
          dynamicLink: `https://www.quickline.co.il/${locale}/${formattedBusinessName}`,
        },
        client.phoneNumber
      );
    }
    if (clId) {
      sendWhatsAppMessage(twoHoursBefore, clId);
    } else {
      throw new Error("clId is null or undefined");
    }
    revalidatePath("/");
    return result.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the appointment");
  }
}

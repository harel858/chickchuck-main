"use server";
import { setupGoogleCalendarClient } from "@lib/google/client";
import { Customer, Treatment, User } from "@prisma/client";
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
      unread: string;
    };
  };
};

export async function createAppointment3(
  access_token: string,
  selectedService: Treatment | null,
  selectedSlot: calendar_v3.Schema$TimePeriod | null,
  selectedUser: User,
  client: Customer
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
        unread: "true",
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
    revalidatePath("/");
    return result.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the appointment");
  }
}

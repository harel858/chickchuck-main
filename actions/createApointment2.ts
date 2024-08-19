"use server";
import { setupGoogleCalendarClient } from "@lib/google/client";

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

export async function createAppointment2(
  access_token: string,
  eventProps: EventProps,
  calendarId: string
) {
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
    return result.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the appointment");
  }
}

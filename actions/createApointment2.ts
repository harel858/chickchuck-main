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
    };
  };
};

export async function createAppointment2(
  access_token: string,
  eventProps: EventProps,
  calendarId: string
) {
  console.log("access_token", access_token);

  try {
    const googleClient = setupGoogleCalendarClient(access_token);
    console.log("googleClient", googleClient);

    const { auth, calendar } = googleClient;
    console.log("auth", auth);

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

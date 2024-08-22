"use server";
import { setupGoogleCalendarClient } from "@lib/google/client";
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

export async function updateEvent(
  access_token: string,
  eventProps: EventProps & { id: string },
  calendarId: string
) {
  try {
    const { id, ...rest } = eventProps;
    const googleClient = setupGoogleCalendarClient(access_token);
    const { auth, calendar } = googleClient;
    calendar.events.update({
      auth: auth,
      calendarId: calendarId,
      eventId: id,
      requestBody: {
        ...rest,
        extendedProperties: {
          private: { ...rest.extendedProperties.private },
        },
      },
    });
    revalidatePath("/schedule");
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the appointment");
  }
}

export async function updateEventsUnreadStatusToFalse(
  access_token: string,
  events: calendar_v3.Schema$Event[],
  calendarId: string
) {
  try {
    for (const event of events) {
      const eventId = event.id;

      if (!eventId) continue;

      const updatedEventProps: EventProps & { id: string } = {
        id: eventId,
        summary: event.summary ?? undefined,
        description: event.description ?? undefined,
        start: {
          dateTime: event.start?.dateTime || "",
          timeZone: event.start?.timeZone || "",
        },
        end: {
          dateTime: event.end?.dateTime || "",
          timeZone: event.end?.timeZone || "",
        },
        extendedProperties: {
          private: {
            unread: "false",
            treatmentId: event.extendedProperties?.private?.treatmentId || "",
            customerId: event.extendedProperties?.private?.customerId || "",
            customerName: event.extendedProperties?.private?.customerName || "",
            conferenceId: event.extendedProperties?.private?.conferenceId || "",
          },
        },
      };

      await updateEvent(access_token, updatedEventProps, calendarId);
    }

    revalidatePath("/schedule");
  } catch (error) {
    console.error("An error occurred while updating events", error);
    throw new Error("An error occurred while updating events");
  }
}

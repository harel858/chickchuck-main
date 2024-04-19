"use server";
import { setupGoogleCalendarClient } from "@lib/google/client";
import { prisma } from "@lib/prisma";
import { AdditionData } from "@ui/calendar/SyncfusionCalendar";
import dayjs from "dayjs";
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

export async function createAppointment(
  access_token: string,
  eventProps: EventProps
) {
  console.log("extendedProperties", {
    ...eventProps.extendedProperties.private,
  });

  try {
    const googleClient = setupGoogleCalendarClient(access_token);
    const { auth, calendar } = googleClient;
    const calendarId = eventProps.extendedProperties.private.conferenceId;
    calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      requestBody: {
        ...eventProps,
        extendedProperties: {
          private: { ...eventProps.extendedProperties.private },
        },
      },
    });
    revalidatePath("/schedule");
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the appointment");
  }
}

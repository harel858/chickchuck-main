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
    };
  };
};

export async function createAppointment2(
  access_token: string,
  eventProps: EventProps
) {
  try {
    const googleClient = setupGoogleCalendarClient(access_token);
    const { auth, calendar, calendarId } = googleClient;
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

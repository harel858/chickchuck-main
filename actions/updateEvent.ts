"use server";
import { setupGoogleCalendarClient } from "@lib/google/client";
import { prisma } from "@lib/prisma";
import { AppointmentStatus, AvailableSlot } from "@prisma/client";
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

export async function updateEvent(
  access_token: string,
  eventProps: EventProps & { id: string }
) {
  try {
    const { id, ...rest } = eventProps;
    const googleClient = setupGoogleCalendarClient(access_token);
    const { auth, calendar, calendarId } = googleClient;
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

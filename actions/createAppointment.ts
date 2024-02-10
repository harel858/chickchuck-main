"use server";
import { setupGoogleCalendarClient } from "@lib/google/client";
import { prisma } from "@lib/prisma";
import { AppointmentStatus, AvailableSlot } from "@prisma/client";
import { AdditionData } from "@ui/calendar/SyncfusionCalendar";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
type EventProps = {
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
    };
  };
};

export async function createAppointment(
  access_token: string,
  eventProps: EventProps
) {
  try {
    const googleClient = setupGoogleCalendarClient(access_token);
    const { auth, calendar, calendarId } = googleClient;
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

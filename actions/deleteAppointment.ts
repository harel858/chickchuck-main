"use server";
import { DeleteBody } from "@api/google/crud";
import { setupGoogleCalendarClient } from "@lib/google/client";
import { deleteGoogleCalendarEvent } from "@lib/google/deleteEvent";
import { calendar_v3 } from "googleapis";
import { revalidatePath } from "next/cache";
import { OAuth2Client } from "google-auth-library";

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
    };
  };
};

export async function deleteAppointment(
  googleClient: {
    auth: OAuth2Client;
    calendar: calendar_v3.Calendar;
    calendarId: string;
  },
  eventProps: DeleteBody
) {
  try {
    const { Id, ...rest } = eventProps;
    const deletedEvent = await deleteGoogleCalendarEvent(googleClient, Id);
    /*     revalidatePath("/schedule");
     */ return deletedEvent;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the appointment");
  }
}

"use server";
import { setupGoogleCalendarClient } from "@lib/google/client";
import { revalidatePath } from "next/cache";
/* import { revalidatePath } from "next/cache";
revalidatePath("/schedule"); */

export async function deleteGoogleCalendarEvent(
  access_token: string,
  eventId: string
) {
  try {
    const googleClient = setupGoogleCalendarClient(access_token);
    const { auth, calendar, calendarId } = googleClient;
    const response = await calendar.events.delete({
      calendarId,
      eventId,
      auth,
    });

    revalidatePath("/");
    return response;
  } catch (error) {
    console.error("Error while deleting event:", error);
    return null;
  }
}

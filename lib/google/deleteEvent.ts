import { OAuth2Client } from "google-auth-library";
import { calendar_v3 } from "googleapis";

export async function deleteGoogleCalendarEvent(
  googleClient: {
    auth: OAuth2Client;
    calendar: calendar_v3.Calendar;
    calendarId: string;
  },
  eventId: string
) {
  try {
    const { auth, calendar, calendarId } = googleClient;
    const response = await calendar.events.delete({
      calendarId,
      eventId,
      auth,
    });
    console.log("Deleted event:", eventId);

    return response;
  } catch (error) {
    console.error("Error while deleting event:", error);
    return null;
  }
}

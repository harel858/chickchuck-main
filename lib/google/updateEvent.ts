import { EventProps } from "actions/createAppointment";
import { OAuth2Client } from "google-auth-library";
import { calendar_v3 } from "googleapis";
import { EditProps } from "types/types";

export async function updateGoogleCalendarEvent(
  googleClient: {
    auth: OAuth2Client;
    calendar: calendar_v3.Calendar;
    calendarId: string;
  },
  updatedEvent: EventProps & { id: string }
) {
  try {
    const { auth, calendar, calendarId } = googleClient;
    const { id, ...rest } = updatedEvent;
    const response = await calendar.events.update({
      calendarId,
      eventId: updatedEvent.id,
      auth,
      requestBody: rest,
    });

    return response.data;
  } catch (error) {
    console.error("Error while updating event:", error);
    return null;
  }
}

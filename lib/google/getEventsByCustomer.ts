import { OAuth2Client } from "google-auth-library";
import { calendar_v3 } from "googleapis";
import { EventProps } from "actions/createAppointment";
import { EditProps } from "types/types";

export async function getEventsByCustomer(
  googleClient: {
    auth: OAuth2Client;
    calendar: calendar_v3.Calendar;
    calendarId: string;
  },
  customerId: string
) {
  try {
    const { auth, calendar, calendarId } = googleClient;

    // Query events from Google Calendar API with extended private customerId property
    const response = await calendar.events.list({
      calendarId,
      auth,
      privateExtendedProperty: [`customerId=${customerId}`], // Pass an array of strings
    });
    console.log("response.data.items", response.data.items);

    return response.data.items;
  } catch (error) {
    console.error("Error while fetching events:", error);
    throw new Error(JSON.stringify(error));
  }
}

// clientSetup.js
import { Auth, google } from "googleapis";

export function setupGoogleCalendarClient(access_token: string | undefined) {
  const auth = new Auth.OAuth2Client({ credentials: { access_token } });

  const calendar = google.calendar("v3");

  return { auth, calendar, calendarId: "primary" };
}

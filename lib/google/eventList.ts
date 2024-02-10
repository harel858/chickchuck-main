import { prisma } from "@lib/prisma";
import { OAuth2Client } from "google-auth-library";
import { calendar_v3 } from "googleapis";

export async function fetchEvents(
  googleClient: {
    auth: OAuth2Client;
    calendar: calendar_v3.Calendar;
    calendarId: string;
  },
  accountId: string
) {
  try {
    const { auth, calendar, calendarId } = googleClient;

    const response = await calendar.events.list({
      calendarId,
      auth,
      fields: "items(*)", // Include extendedProperties
      /*       privateExtendedProperty: ["treatmentId", "customerId"],
       */
    });
    const result = response;
    const newSyncToken = result.data.nextSyncToken;

    await prisma.account.update({
      where: { id: accountId },
      data: {
        syncToken: newSyncToken,
      },
    });

    return result;
  } catch (error) {
    console.error("Error while fetching events:", error);
    return null;
  }
}

import { prisma } from "@lib/prisma";
import { OAuth2Client } from "google-auth-library";
import { calendar_v3 } from "googleapis";

export async function fetchEvents(
  googleClient: {
    auth: OAuth2Client;
    calendar: calendar_v3.Calendar;
    calendarId: string;
  },
  accountId: string,
  calendarIds: string[], // Change to array of calendar IDs
  syncToken?: string
) {
  try {
    const { auth, calendar } = googleClient;

    const allEvents: calendar_v3.Schema$Event[] = [];

    // Loop through each calendar ID and fetch events
    for (let i = 0; i < calendarIds.length; i++) {
      const calendarId = calendarIds[i];
      const response = await calendar.events.list({
        calendarId,
        auth,
        syncToken: syncToken,
        fields: "items(*)",
        /*      privateExtendedProperty: [
          "treatmentId",
          "customerId",
          "conferenceId",
          "customerName",
        ], */
      });
      console.log("responseList", response);

      // Check if response data and items exist
      if (response.data && response.data.items) {
        // Add events from this calendar to the result
        allEvents.push(...response.data.items);
      }

      // Update sync token for the user
      if (i === calendarIds.length) {
        const newSyncToken = response.data.nextSyncToken;
        await prisma.account.update({
          where: { id: accountId },
          data: {
            syncToken: newSyncToken,
          },
        });
      }
    }

    return allEvents;
  } catch (error: any) {
    console.log(error);

    throw new Error("Error while fetching events:", error);
  }
}

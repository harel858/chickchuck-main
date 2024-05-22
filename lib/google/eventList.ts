import { prisma } from "@lib/prisma";
import { AppointmentRequest } from "@prisma/client";
import { OAuth2Client } from "google-auth-library";
import { calendar_v3 } from "googleapis";
import { GaxiosPromise } from "googleapis/build/src/apis/abusiveexperiencereport";
import { CombinedEvent } from "types/types";

export async function fetchEvents2(
  googleClient: {
    auth: OAuth2Client;
    calendar: calendar_v3.Calendar;
  },
  accountId: string,
  calendarIds: string[], // Change to array of calendar IDs
  confirmationNeeded?: boolean | null,
  userId?: string
): Promise<CombinedEvent[]> {
  // Change the return type
  try {
    const { auth, calendar } = googleClient;

    let allEvents: CombinedEvent[] = []; // Use the union type here
    let newSyncToken;

    if (confirmationNeeded !== true) {
      for (const calendarId of calendarIds) {
        let nextPageToken: string | null | undefined = undefined;

        do {
          const res = (await calendar.events.list({
            calendarId,
            pageToken: nextPageToken,
            auth,
          })) as unknown as GaxiosPromise<calendar_v3.Schema$Events>;
          const response = await res;
          newSyncToken =
            allEvents.length > 0 ? response.data.nextSyncToken : null;

          const events = response.data.items || [];
          nextPageToken = response.data.nextPageToken;
          allEvents.push(...events);
        } while (nextPageToken);
      }
    } else {
      const allRequests = await prisma.appointmentRequest.findMany({
        where: { userId: userId },
        include: { treatment: true, customer: true, user: true },
      });
      allEvents.push(...allRequests);
    }

    // Fetch appointment requests

    // Update sync token for the account
    await prisma.account.update({
      where: { id: accountId },
      data: {
        syncToken: newSyncToken,
      },
    });

    return allEvents;
  } catch (error: any) {
    console.error("Error while fetching events:", error);
    throw new Error(error);
  }
}

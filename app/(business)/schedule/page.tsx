import React from "react";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { prisma } from "@lib/prisma";
import SyncfusionCalendar from "@ui/calendar/SyncfusionCalendar";
import { v4 as uuidv4 } from "uuid";
import { getUserAccount } from "@lib/prisma/users";
import { Account, Customer } from "@prisma/client";
import { setupGoogleCalendarClient } from "@lib/google/client";
import { OAuth2Client } from "google-auth-library";
import { calendar_v3 } from "googleapis";

async function fetchWatch(
  account: Account,
  googleClient: {
    auth: OAuth2Client;
    calendar: calendar_v3.Calendar;
    calendarId: string;
  }
) {
  const { auth, calendar, calendarId } = googleClient;
  const watchExpired = account?.watchExpired;
  const isExpired =
    watchExpired && +watchExpired < Math.floor(Date.now() / 1000);

  if (isExpired) {
    const expirationTime = Math.floor(Date.now() / 1000) + 6 * 24 * 60 * 60;
    const uuid = uuidv4();
    try {
      const result = await calendar.events.watch({
        calendarId,
        auth,
        requestBody: {
          id: uuid,
          type: "web_hook",
          address: `https://7a0a-2a00-a041-3a02-cf00-b8d6-c46a-2745-fb0f.ngrok-free.app/api/google/notifications?userId=${account.userId}`,
          expiration: `${expirationTime * 1000}`,
        },
      });

      const newWatch: any = result;
      await prisma.account.update({
        where: { id: account.id },
        data: {
          watchExpired: newWatch.expiration,
        },
      });
    } catch (error) {
      console.error("Error while fetching watch request:", error);
      return null;
    }
  }

  return watchExpired;
}

async function ScheduleListPage() {
  const session = await getServerSession(authOptions);
  console.log("session?.user.access_token", session?.user.access_token);

  if (!session?.user.access_token) {
    return notFound();
  }

  const googleClient = setupGoogleCalendarClient(session?.user.access_token);
  const publicKey = await googleClient.auth.getIapPublicKeys();

  const user = await getUserAccount(session?.user.id);

  if (!user?.accounts[0] || !user.Business) {
    return notFound();
  }

  await fetchWatch(user.accounts[0], googleClient);
  const { Business, ...rest } = user;
  /*   const clients: Customer[] = user.Customer.map((item) => ({}));
   */
  /*   const scheduleProps = await fetchEvents(googleClient, user.accounts[0]?.id);
   */

  return (
    <SyncfusionCalendar
      session={session}
      business={user.Business}
      user={rest}
    />
  );
}
export default ScheduleListPage;

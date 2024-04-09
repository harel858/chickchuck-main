import React from "react";
import VerticalNav from "@ui/(navbar)/VerticalNav";
import { OAuth2Client } from "google-auth-library";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { notFound, redirect } from "next/navigation";
import Navbar from "@ui/(navbar)/Navbar";
import { UserData } from "types/types";
import { prisma } from "@lib/prisma";
import PlusButton from "@ui/(navbar)/specialOperations/plusButton/PlusButton";
import { getUserAccount } from "@lib/prisma/users";
import axios from "axios";
import { calendar_v3 } from "googleapis";
import { Account } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { setupGoogleCalendarClient } from "@lib/google/client";

//expect an error
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
    (watchExpired && +watchExpired < Math.floor(Date.now() / 1000)) ||
    !watchExpired;

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
          address: `https://37dd-2a00-a041-3a02-cf00-fdd7-d435-47e3-6096.ngrok-free.app/api/google/notifications?userId=${account.userId}`,
          expiration: `${expirationTime * 1000}`,
        },
      });
      console.log("resulthokk", result);

      const newWatch: any = result;
      return newWatch;
    } catch (error) {
      console.error("Error while fetching watch request:", error);
      return null;
    }
  }

  return watchExpired;
}

async function fetchEvents(
  googleClient: {
    auth: OAuth2Client;
    calendar: calendar_v3.Calendar;
    calendarId: string;
  },
  expired: string,
  accountId: string
) {
  try {
    const { auth, calendar, calendarId } = googleClient;

    const response = await calendar.events.list({
      calendarId,
      auth,
    });
    const result = response.data;
    const newSyncToken = response.data.nextSyncToken;

    await prisma.account.update({
      where: { id: accountId },
      data: {
        syncToken: newSyncToken,
        watchExpired: expired,
      },
    });

    return result;
  } catch (error) {
    console.error("Error while fetching events:", error);
    return null;
  }
}

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user.access_token) {
    return notFound();
  }

  const googleClient = setupGoogleCalendarClient(session?.user.access_token);
  const user = await getUserAccount(session?.user.id);

  console.log("user?.Business", user?.Business);

  if (!user?.accounts[0]) {
    return notFound();
  }
  if (!user?.accounts[0] || !user.Business) {
    return notFound();
  }
  const watchExpired = await fetchWatch(user.accounts[0], googleClient);

  const scheduleProps = await fetchEvents(
    googleClient,
    watchExpired?.expiration,
    user.accounts[0]?.id
  );
  return (
    <>
      <Navbar
        user={user}
        scheduleProps={scheduleProps}
        session={session}
        link={""}
        watchExpired={JSON.stringify(watchExpired)}
        customers={user.Business?.Customer || []}
      />
      <PlusButton business={user.Business} user={user} session={session} />

      <section className="flex justify-center items-center overflow-hidden">
        <div className="w-full mt-20 overflow-hidden">{children}</div>
      </section>
    </>
  );
}

export default Layout;

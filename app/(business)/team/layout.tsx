import React from "react";
import { OAuth2Client } from "google-auth-library";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { notFound } from "next/navigation";
import Navbar from "@ui/(navbar)/Navbar";
import { prisma } from "@lib/prisma";
import PlusButton from "@ui/(navbar)/specialOperations/plusButton/PlusButton";
import { getUserAccount } from "@lib/prisma/users";
import { calendar_v3 } from "googleapis";
import { Account } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { setupGoogleCalendarClient } from "@lib/google/client";
import Hamburger from "@ui/(navbar)/(responsiveNav)/Hamburger";
import { fetchEvents2 } from "@lib/google/eventList";

async function fetchWatch(
  userId: string,
  googleClient: {
    auth: OAuth2Client;
    calendar: calendar_v3.Calendar;
    calendarId: string;
  },
  calendars: {
    calendarId: string;
    userId: string;
    watchExpired: string | null;
  }[]
) {
  const { auth, calendar } = googleClient;

  try {
    // Iterate over each calendar and set up a watch
    for (const userCalendar of calendars) {
      const watchExpired = userCalendar.watchExpired;
      const isExpired =
        (watchExpired && +watchExpired < Math.floor(Date.now() / 1000)) ||
        !watchExpired;
      console.log("isExpired", isExpired);

      if (watchExpired) {
        const expirationTime = Math.floor(Date.now() / 1000) + 6 * 24 * 60 * 60;
        const uuid = uuidv4();
        const result = await calendar.events.watch({
          calendarId: userCalendar.calendarId,
          auth,
          requestBody: {
            id: uuid,
            type: "web_hook",
            address: `https://74ef-2a00-a041-3a0f-ba00-3435-dcb9-32c5-19f7.ngrok-free.app/api/google/notifications?userId=${userId}&calendarId=${userCalendar.calendarId}`,
            expiration: `${expirationTime * 1000}`,
          },
        });

        await prisma.user.update({
          where: { id: userCalendar.userId },
          data: { watchExpiration: result.data.expiration },
        });
      }
    }
  } catch (error) {
    console.error("Error while fetching watch request:", error);
    return null;
  }

  return calendars.map((calendar) => calendar.watchExpired);
}

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user.access_token) {
    return notFound();
  }

  const googleClient = setupGoogleCalendarClient(session?.user.access_token);
  const user = await getUserAccount(session?.user.id);

  if (!user?.accounts[0]) {
    return notFound();
  }
  if (!user?.accounts[0] || !user.Business) {
    return notFound();
  }

  const calendars: {
    calendarId: string;
    userId: string;
    watchExpired: string | null;
  }[] = user.Business.user.map((user) => ({
    calendarId: user.calendarId ? user.calendarId : "primary",
    userId: user.id,
    watchExpired: user.watchExpiration,
  }));

  await fetchWatch(session?.user.id, googleClient, calendars);

  const calendarsIds: string[] = user.Business.user.map((user) =>
    user.calendarId ? user.calendarId : "primary"
  );
  const scheduleProps = await fetchEvents2(
    googleClient,
    user.accounts[0]?.id,
    calendarsIds
  );

  const formattedBusinessName = session.user.businessName?.replace(/\s+/g, "-"); // Replace whitespace with hyphens
  const profileImage = session.user.image;

  return (
    <>
      <Navbar
        user={user}
        scheduleProps={scheduleProps}
        session={session}
        customers={user.Business?.Customer || []}
      />
      <PlusButton business={user.Business} user={user} session={session} />
      <Hamburger
        user={user}
        profileImage={profileImage}
        formattedBusinessName={formattedBusinessName}
      />

      <section className="flex justify-center items-center overflow-hidden">
        <div className="w-full mt-20 overflow-hidden">{children}</div>
      </section>
    </>
  );
}

export default Layout;

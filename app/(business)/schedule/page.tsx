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
export type DataSource = {
  Text: string;
  Id: string;
  Color?: string;
};

async function ScheduleListPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return notFound();
  }
  const user = await getUserAccount(session?.user.id);
  const access_token = user?.accounts[0]?.access_token;
  const googleClient = setupGoogleCalendarClient(access_token);

  if (!user?.accounts[0] || !user.Business || !access_token) {
    return notFound();
  }

  const { Business, ...rest } = user;
  /*   const clients: Customer[] = user.Customer.map((item) => ({}));
   */
  /*   const scheduleProps = await fetchEvents(googleClient, user.accounts[0]?.id);
   */
  const result: DataSource[] = user.Business.user.map((user) => ({
    Text: user.name,
    Id: user.calendarId ? user.calendarId : "primary",
    Color: undefined,
  }));
  const calendarsId: string[] = user.Business.user.map((user) =>
    user.calendarId ? user.calendarId : "primary"
  );

  return (
    <SyncfusionCalendar
      session={session}
      business={user.Business}
      resourceData={result}
      calendarsIds={calendarsId}
      user={user}
      access_token={access_token}
    />
  );
}
export default ScheduleListPage;

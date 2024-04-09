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

async function ScheduleListPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user.access_token) {
    return notFound();
  }
  const googleClient = setupGoogleCalendarClient(session?.user.access_token);
  const publicKey = await googleClient.auth.getIapPublicKeys();

  const user = await getUserAccount(session?.user.id);

  if (!user?.accounts[0] || !user.Business) {
    return notFound();
  }

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

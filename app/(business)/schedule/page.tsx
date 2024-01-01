import React from "react";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import Calendar from "@ui/googleCalendar/Calendar";

async function fetchEvents(access_token: string) {
  try {
    const res = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + `${access_token}`,
        },
      }
    );
    console.log("res", res);

    const result: any = await res.json();
    console.log("result", result);

    return result;
  } catch (err: any) {
    console.log("err", err);
    return null;
  }
}

async function ScheduleListPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user.access_token) return notFound();
  const scheduleProps = await fetchEvents(session?.user?.access_token);
  console.log("scheduleProps", scheduleProps);

  /*   if (!scheduleProps) return notFound();
   */
  return <Calendar res={scheduleProps} />;
}

/* export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  const params = users?.map((user) => ({ id: user.id.toString() }));

  return params;
} */

export default ScheduleListPage;

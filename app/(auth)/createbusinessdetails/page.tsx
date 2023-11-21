"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { authOptions } from "@lib/auth";
import { Button } from "@ui/Button";
import dayjs from "dayjs";

function page() {
  const session = useSession();
  console.log("session", session);

  async function createCalendarEvent({
    eventName,
    eventDescription,
    start,
    end,
  }: any) {
    console.log("Creating calendar event");
    const event = {
      summary: "new test",
      description: eventDescription,
      start: {
        dateTime: dayjs().toISOString(), // Date.toISOString() ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
      },
      end: {
        dateTime: dayjs().toISOString(), // Date.toISOString() ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
      },
    };
    try {
      const res = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer " +
              "ya29.a0AfB_byD4AiE_CAalyb-ukqkNHpEqEx1DIob2y57LKIYOsepfdGQoHKta2dVVSGtP53H3k_MyjECCX9-AYk8yFMSKYl3K-PZ2-GIHP0qwKHj8tE382PVDDdlEayvo9PSIiYOa_bJsYKsXfxUg2tDMx0c1gcPPYuVoVQaCgYKAZgSARMSFQHGX2MinrxCc2EF0GnEszWUJin0TA0169", // Access token for google
          },
          body: JSON.stringify(event),
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Button onClick={createCalendarEvent}>create</Button>
    </div>
  );
}

export default page;

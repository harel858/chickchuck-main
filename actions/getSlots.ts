"use server";

import { setupGoogleCalendarClient } from "@lib/google/client";
import dayjs, { Dayjs } from "dayjs";

export const fetchEventsByDate = async (
  selectedDateIOS: string,
  access_token: string
) => {
  try {
    const googleClient = setupGoogleCalendarClient(access_token);
    const { auth, calendar, calendarId } = googleClient;
    const date = dayjs(selectedDateIOS);
    const startOfMonth = dayjs(date).startOf("month").toISOString();
    const endOfMonth = dayjs(date).endOf("month").toISOString();
    const response = await calendar.freebusy.query({
      auth: auth,
      requestBody: {
        timeMin: startOfMonth,
        timeMax: endOfMonth,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        groupExpansionMax: 1,
        calendarExpansionMax: 50,
        items: [{ id: calendarId }],
      },
    });
    console.log("response", response);

    return response.data;
  } catch (err: any) {
    console.log(err);
  }
};
/* {
      calendarId: calendarId,
      timeMin: date.startOf("month").toISOString(),
      timeMax: date.endOf("month").toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    } */

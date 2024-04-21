"use server";

import { setupGoogleCalendarClient } from "@lib/google/client";
import { prisma } from "@lib/prisma";
import { TMemberValidation } from "@lib/validators/memberDetails";
import { Vonage } from "@vonage/server-sdk";
import { revalidatePath } from "next/cache";
const vonage = new (Vonage as any)({
  apiKey: `${process.env.API_KEY}`,
  apiSecret: `${process.env.API_SECRET}`,
}) as Vonage;

export default async function addMember(
  access_token: string,
  data: TMemberValidation,
  businessId: string,
  accountId: string,
  timeZone: string
) {
  try {
    const googleClient = setupGoogleCalendarClient(access_token);
    const { auth, calendar, calendarId } = googleClient;
    const newCalendar = await calendar.calendars.insert({
      auth,
      requestBody: { summary: data.name, timeZone },
    });
    if (!newCalendar.data.id) return;
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        phone: data.phone,
        isAdmin: false,
        UserRole: "TEAMMEATE",
        calendarId: newCalendar.data.id,
        Business: { connect: { id: businessId } },
        accountId: accountId,
      },
    });
    const from = "Vonage APIs";
    const to = "972537761400";
    const text = "A text message sent using the Vonage SMS API";
    /*     await vonage.sms.send({ to, from, text });
     */ revalidatePath("/team");
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
}

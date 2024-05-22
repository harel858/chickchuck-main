"use server";

import { prisma } from "@lib/prisma";
import { Customer, Treatment, User } from "@prisma/client";
import { calendar_v3 } from "googleapis";

export async function appointmentRequestHandler(
  selectedService: Treatment,
  selectedSlot: calendar_v3.Schema$TimePeriod | null,
  selectedUser: User,
  client: Customer
) {
  const start = selectedSlot?.start;
  const end = selectedSlot?.end;
  if (!start || !end) throw new Error("start nor end missing");
  try {
    if (!selectedSlot?.start) throw new Error("selectedSlot.start IS MISSING");
    const appointmentRequest = await prisma.appointmentRequest.create({
      data: {
        title: selectedService?.title,
        description: "",
        start: start,
        end: end,
        user: { connect: { id: selectedUser.id } },
        customer: { connect: { id: client.id } },
        treatment: { connect: { id: selectedService.id } },
      },
    });
    return appointmentRequest;
  } catch (err: any) {
    throw new Error(err);
  }
}

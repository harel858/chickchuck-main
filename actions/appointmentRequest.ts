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
  try {
    if (!selectedSlot?.start) throw new Error("selectedSlot.start IS MISSING");
    const appointmentRequest = await prisma.appointmentRequest.create({
      data: {
        title: selectedService?.title,
        description: "",
        date: selectedSlot?.start,
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

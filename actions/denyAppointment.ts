"use server";
import { prisma } from "@lib/prisma";

export async function denyAppointment(requestId: string) {
  try {
    await prisma.appointmentRequest.update({
      where: { id: requestId },
      data: { isConfirmed: false },
    });
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the appointment");
  }
}

"use server";
import { prisma } from "@lib/prisma";
import { revalidatePath } from "next/cache";

export async function denyAppointment(requestId: string) {
  try {
    await prisma.appointmentRequest.update({
      where: { id: requestId },
      data: { isConfirmed: false },
    });
    revalidatePath("/", "page");
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the appointment");
  }
}

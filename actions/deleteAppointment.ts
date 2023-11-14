"use server";

import { prisma } from "@lib/prisma";
import { AppointmentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { AppointmentEvent } from "types/types";

export async function deleteAppointment(event: AppointmentEvent) {
  try {
    let appointment;
    if ("variant" in event) {
      appointment = await prisma.break.findUnique({
        where: { id: event.id },
        include: { appointmentSlot: { include: { availableSlots: true } } },
      });
    } else if ("title" in event) {
      appointment = await prisma.customAppointment.findUnique({
        where: { id: event.id },
        include: { appointmentSlot: { include: { availableSlots: true } } },
      });
    } else {
      appointment = await prisma.appointment.findUnique({
        where: { id: event.id },
        include: { appointmentSlot: { include: { availableSlots: true } } },
      });
    }

    if (!appointment) throw new Error("no appointment found");

    const slots = appointment?.appointmentSlot.availableSlots;

    // Update the available slots to disconnect the appointment slot
    for (let i = 0; i < slots.length; i++) {
      await prisma.availableSlot.update({
        where: { id: slots[i]?.id },
        data: {
          AppointmentSlot: {
            disconnect: { id: appointment.appointmentSlot.id },
          },
        },
      });
    }
    // Delete the appointment
    if ("variant" in event) {
      await prisma.break.delete({
        where: { id: event.id },
      });
    } else if ("title" in event) {
      await prisma.customAppointment.delete({
        where: { id: event.id },
      });
    } else {
      await prisma.appointment.delete({
        where: { id: event.id },
      });
    }
    revalidatePath("/schedule");
  } catch (err) {
    console.log(err);
    throw new Error("internal error");
  }
}

import prisma from ".";
import dayjs, { Dayjs } from "dayjs";

import {
  AppointmentStatus,
  AvailableSlot,
  Prisma,
  PrismaClient,
} from "@prisma/client";

export async function createAppointment(
  customerId: string,
  slots: AvailableSlot[],
  treatmentId: string,
  notes: string | null,
  date: string
) {
  try {
    // Create the appointment slot
    const appointmentSlot = await prisma.appointmentSlot.create({
      data: {
        start: slots[0].start,
        end: slots[slots.length - 1].end,
        date: dayjs(date).format("DD/MM/YYYY"),
        availableSlots: { connect: slots.map((slot) => ({ id: slot.id })) },
      },
    });

    // Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        customer: { connect: { id: customerId } },
        appointmentSlot: { connect: { id: appointmentSlot.id } },
        treatment: { connect: { id: treatmentId } },
        status: AppointmentStatus.SCHEDULED,
      },
      include: { appointmentSlot: true },
    });

    // Update the available slots to reference the appointment slot
    for (let i = 0; i < slots.length; i++) {
      await prisma.availableSlot.update({
        where: { id: slots[i].id },
        data: { AppointmentSlot: { connect: { id: appointmentSlot.id } } },
      });
    }

    return { appointment };
  } catch (createErr) {
    return { createErr };
  }
}

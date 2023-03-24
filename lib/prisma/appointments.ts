import prisma from ".";
import dayjs, { Dayjs } from "dayjs";

import {
  AppointmentStatus,
  AvailableSlot,
  Prisma,
  PrismaClient,
} from "@prisma/client";

export async function createAppointment(
  userId: string,
  customerId: string,
  slots: AvailableSlot[],
  treatmentId: string,
  notes: string | null,
  date: string
) {
  console.log(userId);

  try {
    // Create the appointment slot
    const appointmentSlot = await prisma.appointmentSlot.create({
      data: {
        start: slots[0].start,
        end: slots[slots.length - 1].end,
        date: dayjs(date).format("DD/MM/YYYY"),
        availableSlots: { connect: slots.map((slot) => ({ id: slot.id })) },
        business: { connect: { id: userId } },
      },
    });

    // Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        User: { connect: { id: userId } },
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
    console.log(createErr);

    return { createErr };
  }
}

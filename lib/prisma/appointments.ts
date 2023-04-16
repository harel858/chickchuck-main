import prisma from ".";
import dayjs, { Dayjs } from "dayjs";

import { AppointmentStatus, AvailableSlot } from "@prisma/client";

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
    // Check if appointment slot is already booked
    const existingAppointment = await prisma.appointmentSlot.findFirst({
      where: {
        date: dayjs(date).format("DD/MM/YYYY"),
        start: slots[0].start,
        end: slots[slots.length - 1].end,
        appointments: {
          none: {
            // Filter out appointment slots that already have appointments scheduled
            status: AppointmentStatus.CANCELLED,
          },
        },
        business: {
          // Connect to the user who owns the appointment slots
          id: userId,
        },
      },
    });
    console.log(existingAppointment);

    if (existingAppointment) {
      // If the appointment slot already exists, return an error or handle it however you like
      return { existingAppointment };
    }

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

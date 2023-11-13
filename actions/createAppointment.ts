"use server";
import { prisma } from "@lib/prisma";
import { AppointmentStatus, AvailableSlot } from "@prisma/client";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

export async function createAppointment(
  userId: string,
  customerId: string,
  slots: AvailableSlot[],
  treatmentId: string,
  businessId: string,
  notes: string | null,
  date: string
) {
  const start = slots[0]?.start;
  const end = slots[slots.length - 1]?.end;
  if (!start || !end) throw new Error("not start or end provided");
  try {
    // Check if appointment slot is already booked
    const existingAppointment = await prisma.appointmentSlot.findFirst({
      where: {
        date: dayjs(date).format("DD/MM/YYYY"),
        start,
        end,
        appointments: {
          none: {
            // Filter out appointment slots that already have appointments scheduled
            status: AppointmentStatus.CANCELLED,
          },
        },
        user: {
          // Connect to the user who owns the appointment slots
          id: userId,
        },
      },
    });

    if (existingAppointment) {
      // If the appointment slot already exists, return an error or handle it however you like
      throw new Error("the appointment slot already exists");
    }

    // Create the appointment slot
    const appointmentSlot = await prisma.appointmentSlot.create({
      data: {
        start,
        end,
        date: dayjs(date).format("DD/MM/YYYY"),
        availableSlots: { connect: slots.map((slot) => ({ id: slot.id })) },
        business: { connect: { id: businessId } },
        user: { connect: { id: userId } },
      },
    });

    // Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        User: { connect: { id: userId } },
        customer: { connect: { id: customerId } },
        appointmentSlot: { connect: { id: appointmentSlot.id } },
        treatment: { connect: { id: treatmentId } },
        Business: { connect: { id: businessId } },
        status: AppointmentStatus.SCHEDULED,
      },
      include: { appointmentSlot: true },
    });

    // Update the available slots to reference the appointment slot
    for (let i = 0; i < slots.length; i++) {
      await prisma.availableSlot.update({
        where: { id: slots[i]?.id },
        data: { AppointmentSlot: { connect: { id: appointmentSlot.id } } },
      });
    }
    revalidatePath("/schedule");
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the appointment");
  }
}

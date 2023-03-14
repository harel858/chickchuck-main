import prisma from ".";
import dayjs, { Dayjs } from "dayjs";
import { AvailableSlot } from "@prisma/client";

export async function createAvailableSlots(
  availableSlots: AvailableSlot[],
  businessId: string
) {
  console.log(dayjs(availableSlots[0].start).format("hh:mm A"));

  try {
    const slotsToSave = availableSlots.map((slot) => {
      return {
        start: slot.start,
        end: slot.end,
        businessId,
      };
    });

    const existingSlots = await prisma.availableSlot.findMany({
      where: {
        businessId,
      },
    });
    console.log(existingSlots);
    if (existingSlots.length > 0) {
      await prisma.availableSlot.deleteMany({
        where: {
          businessId,
        },
      });
    }
    const availableSlot = await prisma.availableSlot.createMany({
      data: slotsToSave,
    });
    return { availableSlot };
  } catch (slotFailed) {
    console.log(slotFailed);
    return { slotFailed };
  }
}

export async function updateAvailableSlots(
  availableSlots: AvailableSlot[],
  businessId: string
) {
  // Check if there are any existing slots for the given business ID
  const existingSlots = await prisma.availableSlot.findMany({
    where: {
      businessId,
    },
  });

  // If there are existing slots, delete them
  if (existingSlots.length > 0) {
    await prisma.availableSlot.deleteMany({
      where: {
        businessId,
      },
    });
  }

  // Create new available slots with the updated array of slots
  await createAvailableSlots(availableSlots, businessId);
}

export async function getQueuesByDate(
  userId: string,
  chosenDate: any,
  duration: number
) {
  console.log(duration);

  try {
    const availableSlots = await prisma.availableSlot.findMany({
      where: {
        AND: [
          { businessId: userId },
          { start: { gte: "00:00" } },
          { end: { lte: "23:59" } },
          { AppointmentSlot: null },
          { business: { activityDays: { has: dayjs(chosenDate).day() } } },
        ],
      },
      include: {
        AppointmentSlot: true,
        business: true,
      },
      orderBy: { start: "asc" },
    });
    console.log(availableSlots);

    return { availableSlots };
  } catch (err) {
    return { err };
  }
}

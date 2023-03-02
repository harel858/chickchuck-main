import prisma from ".";
import { AvailableSlot } from "../../types";
import dayjs, { Dayjs } from "dayjs";

export async function createAvailableSlots(
  availableSlots: AvailableSlot[],
  businessId: string
) {
  try {
    const slotsToSave = availableSlots.map((slot) => {
      const start = dayjs(slot.start, "hh:mm A");
      const end = dayjs(slot.end, "hh:mm A");
      return {
        start: start.toISOString(),
        end: end.toISOString(),
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

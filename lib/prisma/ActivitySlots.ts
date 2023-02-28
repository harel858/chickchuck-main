import prisma from ".";
import { AvailableSlot } from "../../types";

export async function createAvailableSlots(
  availableSlots: AvailableSlot[],
  businessId: string
) {
  const slotsToSave = availableSlots.map((slot) => ({
    id: slot.id,
    start: slot.start.toISOString(),
    end: slot.end.toISOString(),
    businessId,
  }));

  await prisma.availableSlot.createMany({
    data: slotsToSave,
  });
}

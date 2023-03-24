import prisma from ".";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AppointmentSlot, AvailableSlot, User } from "@prisma/client";

dayjs.extend(customParseFormat);

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
  chosenDate: string,
  duration: number,
  user: User
) {
  console.log(duration);

  const slotDuration = 5;
  console.log(`slotDuration: ${slotDuration}`);

  const slotsNeeded = Math.ceil(duration / slotDuration);
  console.log(`slotsNeeded: ${slotsNeeded}`);

  try {
    const availableSlots = await prisma.availableSlot.findMany({
      where: {
        AND: [
          { businessId: userId },
          { start: { gte: "00:00" } },
          { end: { lte: "23:59" } },
          { business: { activityDays: { has: dayjs(chosenDate).day() } } },
          {
            NOT: {
              AppointmentSlot: {
                some: {
                  date: dayjs(chosenDate).format("DD/MM/YYYY"),
                },
              },
            },
          },
        ],
      },

      orderBy: { start: "asc" },
    });
    console.log(availableSlots);

    let consecutiveSlots: AvailableSlot[] = [];
    let result = [];

    for (let i = 0; i < availableSlots.length; i++) {
      if (consecutiveSlots.length === 0) {
        consecutiveSlots.push(availableSlots[i]);
      } else {
        const prevSlotStart = dayjs(
          consecutiveSlots[consecutiveSlots.length - 1].start,
          "HH:mm"
        );

        const currentSlotEnd = dayjs(availableSlots[i - 1].end, "HH:mm");
        const currentSlotStart = dayjs(availableSlots[i].start, "HH:mm");

        const minutesBetweenSlots = currentSlotEnd.diff(
          prevSlotStart,
          "minute"
        );
        const minutesToCurrentSlot = currentSlotStart.diff(
          prevSlotStart,
          "minute"
        );

        console.log(`minutesBetweenSlots:${minutesBetweenSlots}`);
        console.log(`minutesToCurrentSlot:${minutesToCurrentSlot}`);

        if (
          minutesBetweenSlots >= slotDuration &&
          minutesToCurrentSlot === slotDuration
        ) {
          consecutiveSlots.push(availableSlots[i]);
          if (consecutiveSlots.length == slotsNeeded) {
            result.push(consecutiveSlots);
            consecutiveSlots = [];
          }
        } else {
          consecutiveSlots = [availableSlots[i]];
        }
      }
    }

    return { availableSlots: [...result] };
  } catch (slotsErr) {
    console.log(slotsErr);

    return { slotsErr };
  }
}

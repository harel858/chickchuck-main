import { prisma } from ".";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AvailableSlot } from "@prisma/client";
import { Slots } from "types/types";

dayjs.extend(customParseFormat);

interface AvailableSlotInterface {
  id: string;
  start: string;
  end: string;
  breakTimeId: string | null;
  userId: string;
  businessId: string;
  date: string;
}

export async function createAvailableSlots(
  availableSlots: AvailableSlot[],
  userId: string,
  businessId: string
) {
  try {
    const res = await prisma.availableSlot.deleteMany({
      where: {
        businessId: businessId,
      },
    });

    return { deleteManySlots: res };
  } catch (slotFailed) {
    console.log(slotFailed);
    return { slotFailed };
  }
}
export async function createUserAvailableSlots(
  availableSlots: Slots[],
  userId: string,
  businessId: string
) {
  try {
    await prisma.availableSlot.deleteMany({
      where: {
        userId: userId,
      },
    });

    const slotsToSave = availableSlots.map((slot) => ({
      start: slot.start,
      end: slot.end,
      businessId,
      userId,
    }));

    const createdSlots = await prisma.availableSlot.createMany({
      data: slotsToSave,
    });

    return { createdSlots };
  } catch (slotFailed) {
    console.log(slotFailed);
    return { slotFailed };
  }
}

export async function getQueuesByMonth(
  userId: string,
  chosenDate: dayjs.Dayjs,
  duration: number
) {
  try {
    const slotDuration = 5;
    const endDate = chosenDate.endOf("month");

    const allAvailableSlots: AvailableSlotInterface[][] = [];

    //loop over 7 days of the week
    for (
      let date = chosenDate;
      date.isBefore(endDate) || date.isSame(endDate);
      date = date.add(1, "day")
    ) {
      const chosenDate = date.format("YYYY-MM-DD");
      const { availableSlots, error } = await getQueuesByDate(
        userId,
        chosenDate,
        duration
      );
      if (availableSlots) {
        allAvailableSlots.push(...availableSlots);
      } else {
        console.log(error);
      }
    }

    return { availableSlots: allAvailableSlots };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export async function getQueuesByDate(
  userId: string,
  chosenDate: string,
  duration: number
) {
  try {
    console.log("chosenDate", chosenDate);

    const formattedDate = dayjs(chosenDate).format("DD/MM/YYYY");
    console.log("formattedDate", formattedDate);

    const slotDuration = 5;
    const slotsNeeded = Math.ceil(duration / slotDuration);

    const availableSlots = await prisma.availableSlot.findMany({
      where: {
        userId,
        start: { gte: "00:00" },
        end: { lte: "23:59" },
        NOT: {
          AppointmentSlot: {
            some: {
              date: dayjs(chosenDate).format("DD/MM/YYYY"),
            },
          },
        },
      },
      orderBy: { start: "asc" },
    });

    let consecutiveSlots: AvailableSlotInterface[] = [];
    const result: AvailableSlotInterface[][] = [];

    for (let i = 0; i < availableSlots.length; i++) {
      const slot = availableSlots[i];

      if (
        slot?.id &&
        slot.start &&
        slot.end &&
        slot.userId &&
        slot.businessId
      ) {
        const formattedSlot: AvailableSlotInterface = {
          id: slot.id,
          start: slot.start,
          end: slot.end,
          breakTimeId: slot.breakTimeId,
          userId: slot.userId,
          businessId: slot.businessId,
          date: formattedDate,
        };

        if (consecutiveSlots.length === 0) {
          consecutiveSlots.push(formattedSlot);
        } else {
          const prevSlotStart = dayjs(
            consecutiveSlots[consecutiveSlots.length - 1]?.start,
            "HH:mm"
          );
          const currentSlotEnd = dayjs(availableSlots[i - 1]?.end, "HH:mm");
          const currentSlotStart = dayjs(availableSlots[i]?.start, "HH:mm");

          const minutesBetweenSlots = currentSlotEnd.diff(
            prevSlotStart,
            "minute"
          );
          const minutesToCurrentSlot = currentSlotStart.diff(
            prevSlotStart,
            "minute"
          );

          if (
            minutesBetweenSlots >= slotDuration &&
            minutesToCurrentSlot === slotDuration
          ) {
            consecutiveSlots.push(formattedSlot);
            if (consecutiveSlots.length === slotsNeeded) {
              result.push(consecutiveSlots);
              consecutiveSlots = [];
            }
          } else {
            consecutiveSlots = [formattedSlot];
          }
        }
      }
    }

    return { availableSlots: result };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

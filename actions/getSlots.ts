"use server";
import { prisma } from "@lib/prisma";
import dayjs from "dayjs";

export async function getQueuesByDate(
  userId: string,
  dateVal: string,
  duration: number,
  time: any
) {
  try {
    const date = dayjs(dateVal);
    const format = "HH:mm";
    const timeParts = time.split(":"); // Split the time string into hours and minutes
    const hours = Number(timeParts[0]);
    const minutes = Number(timeParts[1]);

    const timePlus25Minutes = dayjs(date)
      .set("hours", hours)
      .set("minutes", minutes + duration);
    const endTime = timePlus25Minutes.format(format);

    const slotDuration = 5;
    const slotsNeeded = Math.ceil(duration / slotDuration);
    const formattedDate = date.format("DD/MM/YYYY");
    const availableSlots = await prisma.availableSlot.findMany({
      where: {
        userId,
        start: { gte: time },
        end: { lte: endTime },
        NOT: {
          AppointmentSlot: {
            some: {
              date: formattedDate,
            },
          },
        },
      },
      orderBy: { start: "asc" },
    });
    console.log("availableSlots", availableSlots);
    if (availableSlots.length < slotsNeeded) return null;
    return availableSlots;
  } catch (error) {
    console.log(error);
    return null;
  }
}

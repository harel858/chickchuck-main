"use server";
import { prisma } from "@lib/prisma";
import { DayData } from "@ui/Init/InitActivityDetails";
import { revalidatePath } from "next/cache";

export default async function updateActivityTime(
  businessId: string,
  activityDays: DayData[]
) {
  try {
    await prisma.$transaction([
      prisma.activityDays.deleteMany({
        where: { businessId: businessId },
      }),
      prisma.business.update({
        where: { id: businessId },
        data: {
          activityDays: {
            createMany: {
              data: activityDays.map((day) => ({
                day: day.value,
                isActive: day.isActive,
                start: day.start,
                end: day.end,
              })),
            },
          },
        },
      }),
    ]);
    revalidatePath("/profile");
  } catch (err: any) {
    console.error("Error updating activity time:", err);
    throw new Error("Failed to update activity time");
  }
}

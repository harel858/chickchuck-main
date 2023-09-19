"use server";
import { prisma } from "@lib/prisma";
import { RangeValue } from "rc-picker/lib/interface";
import { revalidatePath } from "next/cache";
import dayjs from "dayjs";

export async function addBreak(start: string, end: string, businessId: string) {
  if (!start || !end) return;

  try {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: { BreakTime: true },
    });
    console.log(business);

    if (!business) throw new Error("business is not found");
    const alreadyexist = business.BreakTime.find(
      (item) => item.StartTime === start && item.EndTime === end
    );
    if (alreadyexist) throw new Error(" Is Already Existed");
    const newBreak = await prisma.breakTime.create({
      data: {
        StartTime: start,
        EndTime: end,
        Business: { connect: { id: businessId } },
      },
    });
    revalidatePath("/team");
  } catch (err) {
    console.log(err);
    throw new Error("workers Is Already Existed");
  }
}

export async function deleteBreak(businessId: string, breakId: string) {
  try {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: { BreakTime: true },
    });
    if (!business) throw new Error("Business is not found");

    // Find the document to delete
    const documentToDelete = business.BreakTime.find(
      (item) => item.id === breakId
    );

    if (!documentToDelete) throw new Error("workers Is Not Existed");
    const deleted = await prisma.breakTime.delete({
      where: { id: breakId },
    });
    revalidatePath("/team");
  } catch (err) {
    console.log(err);
    throw err;
  }
}

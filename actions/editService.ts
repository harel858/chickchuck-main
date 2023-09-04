"use server";
import { prisma } from "@lib/prisma";
import { RequiredDocument } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateService(
  e: FormData,
  requiredDocument: RequiredDocument[],
  id: string
) {
  console.log(e);

  const title = e.get("title")?.toString();
  const cost = e.get("cost")?.toString();
  const duration = e.get("duration")?.toString();
  const advancePayment = e.get("advance Payment")?.toString();
  console.log({ title, cost, duration, advancePayment, requiredDocument });

  try {
    // Check for missing values and invalid input
    if (
      !title ||
      !cost ||
      !duration ||
      !advancePayment ||
      isNaN(+cost) ||
      isNaN(+duration) ||
      +duration <= 0 ||
      isNaN(+advancePayment)
    ) {
      throw new Error("Invalid input data");
    }

    const existingTreatment = await prisma.treatment.findUnique({
      where: { id },
      include: { RequiredDocument: true },
    });

    if (!existingTreatment) {
      throw new Error("Service not found");
    }

    const updatedTreatment = await prisma.treatment.update({
      where: { id },
      data: {
        title,
        cost: +cost,
        advancePayment: +advancePayment,
        duration: +duration,
        RequiredDocument: {
          connect: requiredDocument.map((doc) => ({ id: doc.id })),
        },
      },
      include: { RequiredDocument: true },
    });
    revalidatePath("/services");
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the service");
  }
}

"use server";
import { prisma } from "@lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteService(serviceId: string) {
  try {
    // Check for missing values and invalid input
    if (!serviceId) {
      throw new Error("Invalid input data");
    }

    const existingTreatment = await prisma.treatment.findUnique({
      where: { id: serviceId },
    });

    if (!existingTreatment) {
      throw new Error("Service not found");
    }

    const deleteService = await prisma.treatment.delete({
      where: { id: serviceId },
    });

    revalidatePath("/services");
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the service");
  }
}

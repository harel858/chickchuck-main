"use server";

import { prisma } from "@lib/prisma";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

type NewService = {
  title: string;
  duration: number;
  price: number;
  treatmentId: string;
};
export default async function editService({
  duration,
  price,
  title,
  treatmentId,
}: NewService) {
  try {
    const newTreatment = await prisma.treatment.update({
      where: { id: treatmentId },
      data: {
        cost: +price,
        duration: +duration,
        title,
      },
    });
    revalidatePath("/services");
  } catch (err: any) {
    throw new Error(err);
  }
}

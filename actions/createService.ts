"use server";

import { prisma } from "@lib/prisma";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

type NewService = {
  title: string;
  duration: number;
  price: number;
  businessId: string;
  users: User[];
};
export default async function createService({
  duration,
  price,
  title,
  businessId,
  users,
}: NewService) {
  try {
    const newTreatment = await prisma.treatment.create({
      data: {
        cost: +price,
        duration: +duration,
        title,
        user: { connect: users.map((user) => ({ id: user.id })) },
        business: { connect: { id: businessId } },
      },
    });
    revalidatePath("/services");
  } catch (err: any) {
    throw new Error(err);
  }
}

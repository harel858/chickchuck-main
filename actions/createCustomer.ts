"use server";
import { prisma } from "@lib/prisma";
import { bussinessById } from "@lib/prisma/bussiness/getUnique";
import { createCustomer } from "@lib/prisma/customer/customer";
import validateCustomer from "@lib/validation/customer";
import { revalidatePath } from "next/cache";

interface InputData {
  name: string;
  phoneNumber: string;
  bussinesId: string | null;
}
export async function createNewCustomer({
  name,
  phoneNumber,
  bussinesId,
}: InputData) {
  try {
    console.log("bussinesId", bussinesId);

    const { error } = validateCustomer({
      name,
      phoneNumber,
      bussinesId,
    });
    if (error || !bussinesId) throw new Error(error?.details[0]?.message);

    const res = await prisma.business.update({
      where: { id: bussinesId },
      data: { Customer: { create: { name, phoneNumber } } },
    });

    revalidatePath("/schedule");
    return res;
  } catch (err) {
    console.log(err);
    return;
  }
}

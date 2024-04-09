"use server";

import { prisma } from "@lib/prisma";
import { TBusinessDetailsValidation } from "@lib/validators/business-details-validation";
import { revalidatePath } from "next/cache";

export default async function updateBusinessDetails(
  data: TBusinessDetailsValidation,
  businessId: string
) {
  const { businessAddress, businessName, businessPhone } = data;
  try {
    await prisma.business.update({
      where: { id: businessId },
      data: {
        phone: businessPhone,
        businessName: businessName,
        Address: businessAddress,
      },
    });
    revalidatePath("/profile");
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
}

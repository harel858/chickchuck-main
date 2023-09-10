"use server";
import { prisma } from "@lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateUserForm } from "types/types";
import bcrypt from "bcrypt";

export async function createMember(
  formData: CreateUserForm,
  businessId: string
) {
  const { name, password, "phone Number": phoneNumber } = formData;
  console.log("phoneNumber", phoneNumber);
  if (!name || !phoneNumber || !password) return;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: { Treatment: true },
    });
    const exist = await prisma.user.findUnique({
      where: { phone: phoneNumber },
    });
    if (!business || exist) return;
    const newUser = await prisma?.user.create({
      data: {
        name,
        phone: phoneNumber,
        startActivity: business.openingTime,
        endActivity: business.closingTime,
        activityDays: business.activityDays,
        password: hashedPassword,
        Treatment: {
          connect: business.Treatment.map((item) => ({ id: item.id })),
        },
        isAdmin: false,
        Business: { connect: { id: business.id } },
      },
    });
    revalidatePath("/team");
  } catch (err) {
    console.log(err);
    throw new Error("An error occurred while creating the user");
  }
}

"use server";
import { prisma } from "@lib/prisma";
import { revalidatePath } from "next/cache";
import { UserFileFormData } from "types/types";

export async function updateMemberFile(
  formData: UserFileFormData,
  typeOfWage: "GLOBALY" | "HOURLY",
  userId: string
) {
  const { services, email, salary } = formData;

  try {
    const existingMember = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingMember) {
      throw new Error("Member not found");
    }

    const updatedMember = await prisma.user.update({
      where: { id: userId },
      data: {
        TypeOfWage: { set: typeOfWage },
        Wage: salary,
        email: email,
        Treatment: { connect: services.map((item) => ({ id: item.id })) },
        phone: formData["phone Number"],
      },
    });
    revalidatePath("/team");
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the service");
  }
}

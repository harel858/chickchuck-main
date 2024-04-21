"use server";
import { prisma } from "@lib/prisma";
import { revalidatePath } from "next/cache";

export async function addDocs(e: FormData, businessId: string) {
  const name = e.get("name")?.toString();
  if (!name) throw new Error("No Name Is Provided");
  try {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: { RequiredDocument: true },
    });
    if (!business) throw new Error("business is not found");
    const alreadyexist = business.RequiredDocument.find(
      (item) => item.name === name
    );
    if (alreadyexist) throw new Error("Doc Is Already Existed");
    const newDoc = await prisma.requiredDocument.create({
      data: { name: name, Business: { connect: { id: businessId } } },
    });
    revalidatePath("/services");
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteDocs(businessId: string, docId: string) {
  try {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: { RequiredDocument: true },
    });
    if (!business) throw new Error("Business is not found");

    // Find the document to delete
    const documentToDelete = business.RequiredDocument.find(
      (item) => item.id === docId
    );

    if (!documentToDelete) throw new Error("Doc Is Not Existed");
    const deleted = await prisma.requiredDocument.delete({
      where: { id: docId },
    });
    revalidatePath("/services");
  } catch (err) {
    console.log(err);
    throw err;
  }
}

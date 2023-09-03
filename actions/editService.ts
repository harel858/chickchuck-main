"use server";
import { prisma } from "@lib/prisma";

export async function updateService(e: FormData, id: string) {
  try {
    console.log("e", e);
    const title = e.get("title")?.toString();
    const cost = e.get("cost")?.toString();
    const duration = e.get("duration")?.toString();
    const advancePayment = e.get("advance Payment")?.toString();
    const RequiredDocument = e.get("document Name")?.toString();
    console.log(RequiredDocument);

    const exist = await prisma.treatment.findUnique({
      where: { id: id },
      include: { RequiredDocument: true },
    });
    if (!exist) throw new Error("service not found");
  } catch (error) {
    console.log(error);
  }
}
``;

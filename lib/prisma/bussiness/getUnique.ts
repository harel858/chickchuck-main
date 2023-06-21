import { prisma } from "..";

export async function bussinessById(id: string) {
  try {
    const business = await prisma.business.findUnique({
      where: { id },
      include: { Images: true },
    });
    return business;
  } catch (err) {
    console.log(err);
    return null;
  }
}

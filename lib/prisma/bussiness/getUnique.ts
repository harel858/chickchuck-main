import { prisma } from "..";

export async function bussinessById(id: string) {
  console.log("id", id);

  try {
    const business = await prisma.business.findUnique({
      where: { id },
      include: { Images: true, user: true, Customer: true },
    });
    return business;
  } catch (err) {
    console.log(err);
    return null;
  }
}

import { prisma } from ".";

export async function setNewImage(profileSrc: string, userId: string) {
  try {
    const profileUpdated = await prisma.user.update({
      where: { id: userId },
      data: { image: profileSrc },
    });
    return { profileUpdated };
  } catch (err) {
    return { err };
  }
}

import prisma from ".";

export async function setNewImage(profileSrc: string, userId: string) {
  try {
    const profileUpdated = await prisma.user.update({
      where: { id: userId },
      data: { profileSrc },
    });
    console.log(profileUpdated);
    return { profileUpdated };
  } catch (err) {
    console.log(err);

    return { err };
  }
}

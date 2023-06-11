import prisma from ".";

// Create Profile Image
export const createProfileImage = async (fileName: string, userId: string) => {
  try {
    const created = await prisma.images.create({
      data: {
        user: { connect: { id: userId } },
        profileImgName: fileName,
      },
    });
    return created;
  } catch (err) {
    console.log(err);
    return null;
  }
};

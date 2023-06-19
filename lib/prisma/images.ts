import { prisma } from ".";

// Create Profile Image
export const createProfileImages = async (params: {
  fileName: string;
  userId: string;
  type: "PROFILE" | "BACKGROUND";
}) => {
  console.log("params", params);

  const { fileName, type, userId } = params;
  try {
    if (type == "PROFILE") {
      const created = await prisma.images.create({
        data: {
          User: { connect: { id: userId } },
          profileImgName: fileName,
        },
      });
      return { created };
    }
    if (type == "BACKGROUND") {
      const created = await prisma.images.create({
        data: {
          User: { connect: { id: userId } },
          backgroundImgName: fileName,
        },
      });
      return { created };
    }
    return { err: "not type provided" };
  } catch (err) {
    console.log(err);
    return { err };
  }
};
export const updateProfileImages = async (params: {
  fileName: string;
  userId: string;
  type: "PROFILE" | "BACKGROUND";
}) => {
  console.log("params", params);

  const { fileName, type, userId } = params;
  try {
    if (type == "PROFILE") {
      const created = await prisma.images.update({
        where: { userId: userId },
        data: {
          profileImgName: fileName,
        },
      });
      return created;
    }
    if (type == "BACKGROUND") {
      const created = await prisma.images.update({
        where: { userId: userId },
        data: {
          backgroundImgName: fileName,
        },
      });
      console.log(created);
      return created;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const createBackGroundImage = async (
  fileName: string,
  userId: string
) => {
  try {
    const created = await prisma.images.create({
      data: {
        User: { connect: { id: userId } },
        backgroundImgName: fileName,
      },
    });
    return created;
  } catch (err) {
    console.log(err);
    return null;
  }
};

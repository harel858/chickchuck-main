import { prisma } from ".";

// Create Profile Image
export const createProfileImages = async (params: {
  fileName: string;
  businessId: string;
  type: "PROFILE" | "BACKGROUND";
}) => {
  const { fileName, type, businessId } = params;
  try {
    if (type == "PROFILE") {
      const created = await prisma.images.create({
        data: {
          Business: { connect: { id: businessId } },
          profileImgName: fileName,
        },
      });
      return { created };
    }
    if (type == "BACKGROUND") {
      const created = await prisma.images.create({
        data: {
          Business: { connect: { id: businessId } },
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
  businessId: string;
  type: "PROFILE" | "BACKGROUND";
}) => {
  const { fileName, type, businessId } = params;
  try {
    /*   if (type == "PROFILE") {
      const created = await prisma.images.update({
        where: { businessId },
        data: {
          profileImgName: fileName,
        },
      });
      return created;
    } */
    /* if (type == "BACKGROUND") {
      const created = await prisma.images.update({
        where: { businessId },
        data: {
          backgroundImgName: fileName,
        },
      });
      return created;
    } */
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const createBackGroundImage = async (
  fileName: string,
  businessId: string
) => {
  try {
    const created = await prisma.images.create({
      data: {
        Business: { connect: { id: businessId } },
        backgroundImgName: fileName,
      },
    });
    return created;
  } catch (err) {
    console.log(err);
    return null;
  }
};

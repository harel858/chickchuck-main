import { prisma } from ".";

// Create Profile Image
export const updateProfileImages = async (
  paramsArray: {
    fileName: string;
    businessId: string;
    type: "PROFILE" | "BACKGROUND" | "GALLERY";
    imagesId?: string; // Make imagesId optional
  }[]
) => {
  try {
    const results = await Promise.all(
      paramsArray.map(async (params) => {
        const { fileName, type, businessId } = params;

        if (type === "PROFILE") {
          // Check if there's an existing profile image
          const existingImage = await prisma.images.findFirst({
            where: {
              businessId: businessId,
              profileImgName: {
                not: null,
              },
            },
          });

          if (existingImage) {
            // If existing image found, update it
            const updated = await prisma.images.update({
              where: { id: existingImage.id },
              data: { profileImgName: fileName },
            });
            return { updated };
          } else {
            // If no existing image found, create a new one
            const created = await prisma.images.create({
              data: {
                Business: { connect: { id: businessId } },
                profileImgName: fileName,
              },
            });
            return { created };
          }
        }

        if (type === "BACKGROUND") {
          // Check if there's an existing background image
          const existingImage = await prisma.images.findFirst({
            where: {
              businessId: businessId,
              backgroundImgName: {
                not: null,
              },
            },
          });

          if (existingImage) {
            // If existing image found, update it
            const updated = await prisma.images.update({
              where: { id: existingImage.id },
              data: { backgroundImgName: fileName },
            });
            return { updated };
          } else {
            // If no existing image found, create a new one
            const created = await prisma.images.create({
              data: {
                Business: { connect: { id: businessId } },
                backgroundImgName: fileName,
              },
            });
            return { created };
          }
        }

        if (type === "GALLERY") {
          console.log("businessId", businessId);

          // Create a new gallery image
          const created = await prisma.images.create({
            data: {
              Business: { connect: { id: businessId } },
              galleryImgName: fileName,
            },
          });
          return { created };
        }

        return { err: "Invalid type provided" };
      })
    );

    return results;
  } catch (err) {
    console.log(err);
    return { err };
  }
};

export const createProfileImage = async (
  fileName: string,
  businessId: string
) => {
  try {
    const created = await prisma.images.create({
      data: {
        Business: { connect: { id: businessId } },
        profileImgName: fileName,
      },
    });
    return created;
  } catch (err) {
    console.log(err);
    return null;
  }
};

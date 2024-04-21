import { Business, Images, RequiredDocument, User } from "@prisma/client";
import { prisma } from ".";

type CreateData = {
  title: string;
  cost: number;
  duration: number;
  documentName: RequiredDocument[];
  advancePayment: number;
  business: Business & { user: User[] };
};

export const createTreatment = async ({
  title,
  cost,
  duration,
  documentName,
  advancePayment,
  business,
}: CreateData) => {
  const { id: businessId, user: businessUsers } = business;

  try {
    const treatmentData = {
      title,
      cost,
      duration,
      advancePayment,
      RequiredDocument:
        documentName.length > 0
          ? {
              connect: documentName.map((doc) => ({ id: doc.id })),
            }
          : {},
      business: { connect: { id: businessId } },
      user: { connect: businessUsers.map((user) => ({ id: user.id })) }, // Connecting to all users
    };

    const newTreatment = await prisma.treatment.create({
      data: treatmentData,
    });

    return newTreatment;
  } catch (error) {
    console.error("Error creating treatment:", error);
    throw error;
  }
};

export async function deleteById(id: string) {
  try {
    const deleteSuccess = await prisma.treatment.delete({ where: { id } });
    return { deleteSuccess };
  } catch (err) {
    return { err };
  }
}

export const getTreatmentById = async (treatmentId: any) => {
  try {
    const treatmentFound = await prisma.treatment.findUnique({
      where: {
        id: treatmentId,
      },
    });
    return { treatmentFound };
  } catch (treatmentNotFound) {
    return { treatmentNotFound };
  }
};

export const getTreatments = async (businessId: any) => {
  try {
    const treatments = await prisma.treatment.findMany({
      where: {
        businessId,
      },
    });

    return { treatments };
  } catch (treatmentNotFound) {
    return { treatmentNotFound };
  }
};

import { Business, Images, RequiredDocument, User } from "@prisma/client";
import { prisma } from ".";

type CreateData = {
  title: string;
  cost: number;
  duration: number;
  documentName: RequiredDocument[];
  advancePayment: number;
  business: Business & {
    user: User[];
    Images: Images | null;
  };
};

export const createTreatment = async ({
  title,
  cost,
  duration,
  documentName,
  advancePayment,
  business,
}: CreateData) => {
  const { id: businessId, user: users } = business;

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
      user: { connect: users.map((user) => ({ id: user.id })) },
      business: { connect: { id: businessId } },
    };

    const newTreatment = await prisma.treatment.create({
      data: treatmentData,
      include: { RequiredDocument: true },
    });

    return { newTreatment };
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

import { Business, Images, User } from "@prisma/client";
import { prisma } from ".";

type CreateData = {
  title: string;
  cost: number;
  duration: number;
  documentName: string;
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
  console.log("documentName", documentName);

  const { id: businessId, user: users, Images } = business;

  try {
    const treatmentData = {
      title,
      cost,
      duration,
      advancePayment,
      RequiredDocument: {},
      user: { connect: users.map((user) => ({ id: user.id })) },
      business: { connect: { id: businessId } },
    };

    if (documentName) {
      console.log("documentName", documentName);

      const newRequiredDocument = await prisma.requiredDocument.create({
        data: { name: documentName },
      });

      treatmentData.RequiredDocument = {
        connect: { id: newRequiredDocument.id },
      };
    }

    const newTreatment = await prisma.treatment.create({
      data: treatmentData,
      include: { RequiredDocument: true },
    });

    // Log for debugging
    console.log("New Treatment:", newTreatment);
    console.log("Required Document:", newTreatment.RequiredDocument);
    console.log("newTreatment.RequiredDocument", newTreatment.RequiredDocument);

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

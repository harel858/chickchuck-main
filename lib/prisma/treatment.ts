import { prisma } from ".";

type CreateData = {
  title: string;
  cost: number;
  duration: number;
  businessId: string;
};

export const createTreatment = async ({
  title,
  cost,
  duration,
  businessId,
}: CreateData) => {
  try {
    const newTreatment = await prisma.treatment.create({
      data: {
        title,
        cost,
        duration,
        businessId,
      },
    });
    console.log(newTreatment);

    return { newTreatment };
  } catch (insertionErr) {
    console.log(insertionErr);
    return { insertionErr };
  }
};

export async function deleteById(id: any) {
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

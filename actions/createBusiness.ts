"use server";
import { prisma } from "@lib/prisma";
import { TBusinessDetailsValidation } from "@lib/validators/business-details-validation";
import { DayData } from "@ui/Init/InitActivityDetails";
import { ServiceInput } from "@ui/Init/InitServices";

export async function createBusiness(
  email: string,
  businessDetails: TBusinessDetailsValidation,
  activityDays: DayData[],
  treatments: ServiceInput[]
) {
  const { businessName, businessPhone, businessType, fromWhere, lastCalendar } =
    businessDetails;

  try {
    // Create a new business and associate it with the user
    const newBusiness = await prisma.business.create({
      data: {
        businessName,
        phone: businessPhone,
        BusinessType: businessType,
        ComeFrom: fromWhere,
        LastCalendar: lastCalendar,
        user: { connect: { email } },
      },
      include: { user: true },
    });

    // Create new activity days associated with the new business
    await prisma.activityDays.createMany({
      data: activityDays.map((day) => ({
        day: day.value,
        start: day.start,
        end: day.end,
        businessId: newBusiness.id,
        userId: newBusiness.user[0]?.id!,
      })),
    });

    // Create new treatments associated with the new business
    await prisma.treatment.createMany({
      data: treatments.map((treatment) => ({
        title: treatment.title,
        cost: +treatment.price,
        duration: +treatment.duration,
        businessId: newBusiness.id,
      })),
    });

    // Connect the new business to the user
    await prisma.user.update({
      where: { email },
      data: {
        Business: {
          connect: { id: newBusiness.id },
        },
      },
    });

    console.log("Business and related data created successfully.");
  } catch (err) {
    console.error(err);
    throw new Error("Internal error");
  }
}

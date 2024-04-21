"use server";
import { uploadImages } from "@lib/aws/s3";
import { prisma } from "@lib/prisma";
import { TBusinessDetailsValidation } from "@lib/validators/business-details-validation";
import { DayData } from "@ui/Init/InitActivityDetails";
import { ServiceInput } from "@ui/Init/InitServices";
import { UploadFile } from "antd";
import fs from "fs";
export const config = {
  api: {
    bodyParser: false,
  },
};

const bucketName = process.env.BUCKET_NAME!;

export async function createBusiness(
  email: string,
  businessDetails: TBusinessDetailsValidation,
  activityDays: DayData[],
  treatments: ServiceInput[],
  logo: UploadFile<any>[],
  gallaryList: UploadFile<any>[]
) {
  const {
    businessName,
    businessPhone,
    businessType,
    fromWhere,
    lastCalendar,
    businessAddress,
  } = businessDetails;

  try {
    // Process form data
    const params = {
      Bucket: bucketName,
      Key: logo[0]?.name,
      Body: fs.createReadStream(logo[0]?.thumbUrl!),
      ContentType: logo[0]?.type!,
    };

    const upload = await uploadImages([params]);
    console.log("upload", upload);

    // Create a new business and associate it with the user
    const newBusiness = await prisma.business.create({
      data: {
        businessName,
        phone: businessPhone,
        BusinessType: businessType,
        Address: businessAddress,
        ComeFrom: fromWhere,
        LastCalendar: lastCalendar,
        user: { connect: { email } },
        Images: {
          createMany: {
            data: {
              profileImgName: logo[0]?.name,
            },
          },
        },
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
        isActive: day.isActive,
      })),
    });

    // Create new treatments associated with the new business
    await prisma.treatment.createMany({
      data: treatments.map((treatment) => ({
        title: treatment.title,
        cost: +treatment.price,
        duration: +treatment.duration,
        businessId: newBusiness.id,
        userId: newBusiness.user[0]?.id!,
        advancePayment: 0,
      })),
    });

    if (!logo[0]?.name) throw new Error("Key is missing");

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

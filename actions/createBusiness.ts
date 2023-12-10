"use server";
import { uploadImage } from "@lib/aws/s3";
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

    if (!logo[0]?.name) throw new Error("Key is missing");

    // Process form data
    const params = {
      Bucket: bucketName,
      Key: logo[0]?.name,
      Body: fs.createReadStream(logo[0]?.thumbUrl!),
      ContentType: logo[0]?.type!,
    };

    const upload = await uploadImage(params);
    console.log("upload", upload);

    const created = await prisma.images.update({
      where: { businessId: newBusiness.id },
      data: {
        profileImgName: logo[0]?.name,
      },
    });
    console.log("created", created);

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

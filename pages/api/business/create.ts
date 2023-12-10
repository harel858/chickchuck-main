import { uploadImages, UploadParams } from "@lib/aws/s3";
import { prisma } from "@lib/prisma";
import { TBusinessDetailsValidation } from "@lib/validators/business-details-validation";
import { DayData } from "@ui/Init/InitActivityDetails";
import { ServiceInput } from "@ui/Init/InitServices";
import { UploadFile } from "antd";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import formidable from "formidable";
import { Business } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false,
  },
};
const bucketName = process.env.BUCKET_NAME!;

type ReqBody = {
  userId: string;
  businessDetails: TBusinessDetailsValidation;
  activityDays: DayData[];
  treatments: ServiceInput[];
  logo: UploadFile<any>[];
  gallaryList: UploadFile<any>[];
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    let businessCreated: Business | null = null;
    const form = new formidable.IncomingForm({ multiples: false });
    form.parse(req, async (error, fields, files) => {
      if (error) return res.status(400).json({ error });

      const logo = files.logoFile as formidable.File;

      const logoParams: UploadParams = {
        Bucket: bucketName,
        Key: logo?.newFilename,
        Body: fs.createReadStream(logo.filepath),
        ContentType: logo.mimetype!,
      };

      const gallaryLength = fields.gallaryLength as string;
      const uploadParams: UploadParams[] = [logoParams];
      for (let i = 0; i < +gallaryLength; i++) {
        const item = files[`gallaryList[${i}]`] as formidable.File;
        const uploadParam: UploadParams = {
          Bucket: bucketName,
          Key: item?.newFilename,
          Body: fs.createReadStream(item.filepath),
          ContentType: item.mimetype!,
        };
        uploadParams.push(uploadParam);
      }
      const uploadedImages = await uploadImages(uploadParams);

      if (!uploadedImages)
        return res.status(400).json("uploadedImages fail to create");

      const userId = fields.userId as string;

      const activityDays = JSON.parse(
        fields.activityDays as string
      ) as DayData[];

      const businessDetails = JSON.parse(
        fields.businessDetails as string
      ) as TBusinessDetailsValidation;

      const treatments = JSON.parse(
        fields.services as string
      ) as ServiceInput[];

      const {
        businessName,
        businessPhone,
        businessType,
        fromWhere,
        lastCalendar,
      } = businessDetails;

      const newBusiness = await prisma.business.create({
        data: {
          businessName,
          phone: businessPhone,
          BusinessType: businessType,
          ComeFrom: fromWhere,
          LastCalendar: lastCalendar,
          Treatment: {
            createMany: {
              data: treatments.map((service) => ({
                cost: +service.price,
                duration: +service.duration,
                title: service.title,
              })),
            },
          },
          Images: {
            createMany: {
              data: uploadParams.map((param, i) => ({
                profileImgName: i === 0 ? param.Key : null,
                backgroundImgName: i > 0 ? param.Key : null,
              })),
            },
          },
          activityDays: {
            createMany: {
              data: activityDays.map((day) => ({
                day: day.value,
                start: day.start,
                end: day.end,
              })),
            },
          },
          user: { connect: { id: userId } },
        },
        include: {
          user: true,
          Images: true,
          activityDays: true,
          Treatment: true,
        },
      });
      await prisma.user.update({
        where: { id: userId },
        data: {
          activityDays: {
            createMany: {
              data: activityDays.map((day) => ({
                day: day.value,
                start: day.start,
                end: day.end,
              })),
            },
          },
        },
      });
      console.log("newBusiness", newBusiness);
      businessCreated = newBusiness;
    });
    return res.json(businessCreated);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error");
  }
}

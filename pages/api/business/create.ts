import { uploadImages, UploadParams } from "@lib/aws/s3";
import { prisma } from "@lib/prisma";
import { TBusinessDetailsValidation } from "@lib/validators/business-details-validation";
import { DayData } from "@ui/Init/InitActivityDetails";
import { ServiceInput } from "@ui/Init/InitServices";
import { UploadFile } from "antd";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import formidable from "formidable";
import cookies from "next-cookies";

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
  galleryList: UploadFile<any>[];
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Access cookies
    const allCookies = cookies({ req });
    console.log("Cookies in API route:", allCookies);
    const preferredLocale = (allCookies.NEXT_LOCALE || "en").toLowerCase(); // Convert to lowercase

    const form = new formidable.IncomingForm({ multiples: false });
    await new Promise((resolve, reject) => {
      form.parse(req, async (error, fields, files) => {
        try {
          if (error) {
            reject(error);
            return;
          }

          const userId = fields.userId as string;
          console.log("userId", userId);

          // Check if the user exists
          const userExists = await prisma.user.findUnique({
            where: { id: userId },
          });

          if (!userExists) {
            return res.status(400).json({ message: "User not found." });
          }

          const updateUser = await prisma.user.update({
            where: { id: userExists.id },
            data: { createdAt: new Date().toISOString() },
          });

          const businessDetails = JSON.parse(
            fields.businessDetails as string
          ) as TBusinessDetailsValidation;
          const activityDays = JSON.parse(
            fields.activityDays as string
          ) as DayData[];
          const treatments = JSON.parse(
            fields.services as string
          ) as ServiceInput[];

          const uploadParams: UploadParams[] = [];
          const logo = files.logoFile as formidable.File | null;

          if (logo) {
            const logoParams: UploadParams = {
              Bucket: bucketName,
              Key: logo.newFilename,
              Body: fs.createReadStream(logo.filepath),
              ContentType: logo.mimetype!,
            };
            uploadParams.push(logoParams);
          }

          const galleryLength = Number(fields.galleryLength);
          for (let i = 0; i < galleryLength; i++) {
            const item = files[`galleryList[${i}]`] as formidable.File;
            const uploadParam: UploadParams = {
              Bucket: bucketName,
              Key: item.newFilename,
              Body: fs.createReadStream(item.filepath),
              ContentType: item.mimetype!,
            };
            uploadParams.push(uploadParam);
          }

          const uploadedImages = await uploadImages(uploadParams);
          if (!uploadedImages)
            return res.status(400).json("Failed to upload images.");

          const newBusiness = await prisma.business.create({
            data: {
              businessName: businessDetails.businessName,
              phone: businessDetails.businessPhone,
              Address: businessDetails.businessAddress,
              preferredLocale: preferredLocale,
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
                    isActive: day.isActive,
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
              isAdmin: true,
              preferredLocale: preferredLocale,
              activityDays: {
                createMany: {
                  data: activityDays.map((day) => ({
                    day: day.value,
                    start: day.start,
                    end: day.end,
                    isActive: day.isActive,
                  })),
                },
              },
              Treatment: {
                connect: newBusiness.Treatment.map((service) => ({
                  id: service.id,
                })),
              },
            },
          });

          // Sending response indicating success
          res.status(200).json({ message: "Success" });
        } catch (err: any) {
          console.error(err);
          // Sending response for internal server error
          return res.status(500).json("Internal server error");
        }
      });
    });
  } catch (error) {
    console.error(error);
    // Sending response for internal server error
    return res.status(500).json("Internal server error");
  }
}

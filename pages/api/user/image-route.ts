import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import {
  GetParam,
  UploadParams,
  deleteImagesS3,
  uploadImages,
} from "@lib/aws/s3";
import {
  createProfileImage,
  deleteGalleryImages,
  getGalleryImages,
  updateProfileImages,
} from "@lib/prisma/images";
import { getUserAccount } from "@lib/prisma/users";
import { bussinessById } from "@lib/prisma/bussiness/getUnique";
export const config = {
  api: {
    bodyParser: false,
  },
};
const bucketName = process.env.BUCKET_NAME!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm({ multiples: false });

      form.parse(req, async (error, fields, files) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "An error occurred" });
        }
        const imageSrc = files?.imageSrc as formidable.File;
        const userId = fields?.userId as string;
        const type = fields?.type as "PROFILE" | "BACKGROUND" | "GALLERY";

        const userExist = await getUserAccount(userId);
        if (!userExist?.Business) return res.status(500).json("user not found");
        const business = await bussinessById(userExist.Business.id);
        if (!business) return res.status(500).json("business not found");
        const uploadParams: UploadParams[] = [];

        if (type == "PROFILE") {
          // Process form data
          const params = {
            Bucket: bucketName,
            Key: imageSrc.newFilename,
            Body: fs.createReadStream(imageSrc.filepath),
            ContentType: imageSrc.mimetype!,
          };
          const upload = await uploadImages([params]);
          if (!upload) return res.status(500).json("s3 bucket err");
          const result = await updateProfileImages([
            {
              fileName: imageSrc.newFilename,
              businessId: business.id,
              type,
              imagesId: business.Images[0]?.id || "",
            },
          ]);
          if (!result) return res.status(500).json("prisma err");
          // Send the response
          return res.status(201).json({ message: result });
        }
        if (type == "BACKGROUND") {
          // Process form data
          const params = {
            Bucket: bucketName,
            Key: imageSrc.newFilename,
            Body: fs.createReadStream(imageSrc.filepath),
            ContentType: imageSrc.mimetype!,
          };
          const upload = await uploadImages([params]);
          if (!upload) return res.status(500).json("s3 bucket err");
          const result = await updateProfileImages([
            {
              fileName: imageSrc.newFilename,
              businessId: business.id,
              type,
              imagesId: business.Images[0]?.id || "",
            },
          ]);
          if (!result) return res.status(500).json("prisma err");
          // Send the response
          return res.status(201).json({ message: result });
        }
        if (type === "GALLERY") {
          const imageNames = await getGalleryImages(business.id);
          const deleteParams: GetParam[] = imageNames?.map((item) => ({
            Bucket: bucketName,
            Key: item.galleryImgName,
          }));
          await deleteImagesS3(deleteParams);
          await deleteGalleryImages(business.id);
          const galleryLength = Number(fields.galleryLength);
          const params: {
            fileName: string;
            businessId: string;
            type: "PROFILE" | "BACKGROUND" | "GALLERY";
            imagesId?: string;
          }[] = [];

          for (let i = 0; i < galleryLength; i++) {
            const item = files[`galleryList[${i}]`] as formidable.File;
            if (!item) continue;

            const uploadParam: UploadParams = {
              Bucket: bucketName,
              Key: item?.newFilename,
              Body: fs.createReadStream(item.filepath),
              ContentType: item?.mimetype!,
            };

            uploadParams.push(uploadParam);
            params.push({
              fileName: item.newFilename,
              businessId: business.id,
              type,
            });
          }

          const upload = await uploadImages(uploadParams);
          if (!upload) return res.status(500).json("s3 bucket err");

          const result = await updateProfileImages(params);
          if (!result) return res.status(500).json("prisma err");

          return res.status(201).json({ message: result });
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} is not allowed.`);
  }
}

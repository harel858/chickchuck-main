import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { uploadImage } from "@lib/aws/s3";
import { createProfileImages, updateProfileImages } from "@lib/prisma/images";
import { getById } from "@lib/prisma/users";
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
      console.log("req.body", req.body);

      const form = new formidable.IncomingForm({ multiples: false });

      form.parse(req, async (error, fields, files) => {
        if (error || !files.imageSrc) {
          console.error(error);
          return res.status(500).json({ error: "An error occurred" });
        }
        const imageSrc = files.imageSrc as formidable.File;
        const userId = fields.userId as string;
        const type = fields.type as "PROFILE" | "BACKGROUND";

        const { userExist, err } = await getById(userId);
        if (!userExist || err) return res.status(500).json("user not found");
        const business = await bussinessById(userExist.Business.id);
        if (!business) return res.status(500).json("business not found");

        // Process form data
        const params = {
          Bucket: bucketName,
          Key: imageSrc.newFilename,
          Body: fs.createReadStream(imageSrc.filepath),
          ContentType: imageSrc.mimetype!,
        };
        if (!business.Images) {
          const { created, err } = await createProfileImages({
            fileName: imageSrc.newFilename,
            businessId: business.id,
            type,
          });
          if (!created || err) return res.status(500).json("creation error");
          if (created) return res.status(201).json(created);
        }

        // ...
        if (type == "PROFILE") {
          const upload = await uploadImage(params);
          if (!upload) return res.status(500).json("s3 bucket err");
          const result = await updateProfileImages({
            fileName: imageSrc.newFilename,
            businessId: business.id,
            type,
          });
          if (!result) return res.status(500).json("prisma err");
          // Send the response
          return res.status(201).json({ message: result });
        }
        if (type == "BACKGROUND") {
          console.log(type);

          const upload = await uploadImage(params);
          if (!upload) return res.status(500).json("s3 bucket err");
          const result = await updateProfileImages({
            fileName: imageSrc.newFilename,
            businessId: business.id,
            type,
          });
          if (!result) return res.status(500).json("prisma err");
          // Send the response
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

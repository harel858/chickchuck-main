import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import prisma from "@lib/prisma";
import { getImage, uploadImage } from "@lib/aws/s3";
import { createProfileImage } from "@lib/prisma/images";
import { getById } from "@lib/prisma/users";
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

        const { userExist, err } = await getById(userId);
        if (!userExist || err) return res.status(500).json("user not found");

        console.log("fields", fields.userId);
        console.log("files", imageSrc.originalFilename);

        // Process form data
        const params = {
          Bucket: bucketName,
          Key: imageSrc.newFilename,
          Body: fs.createReadStream(imageSrc.filepath),
          ContentType: imageSrc.mimetype!,
        };
        // ...
        const upload = await uploadImage(params);
        if (!upload) return res.status(500).json("s3 bucket err");
        const result = await createProfileImage(imageSrc.newFilename, userId);
        if (!result) return res.status(500).json("prisma err");
        // Send the response
        return res.status(201).json({ message: result });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err });
    }
  }
  if (req.method === "GET" && req.query.userId) {
    const userId = req.query.userId as string;
    const { userExist, err } = await getById(userId);
    if (!userExist || err) return res.status(500).json("user not found");
    const params = {
      Bucket: bucketName,
      Key: userExist.Images[0].profileImgName,
    };
    const url = await getImage(params);
    if (!url) return res.status(500).json("s3 bucket err");
    return res.status(200).json({ url });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} is not allowed.`);
  }
}

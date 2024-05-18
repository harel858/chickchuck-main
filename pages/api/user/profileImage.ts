// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setNewImage } from "../../../lib/prisma/profileImage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { imageSrc, userId } = req.body;
    const { profileUpdated, err } = await setNewImage(imageSrc, userId);
    if (profileUpdated)
      return res.status(200).json("profile was successfully changed");
    return res.status(500).json("An Error Occurred");
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

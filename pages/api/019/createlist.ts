// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { bussinessById } from "@lib/prisma/bussiness/getUnique";
import validateService from "@lib/validation/serviceValidation";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  if (req.method == "DELETE") {
  }
  if (req.method == "GET") {
    try {
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

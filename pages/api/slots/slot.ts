// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getById } from "../../../lib/prisma/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { activityDays, availableSlots, id } = req.body;
    console.log(activityDays, availableSlots, id);
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

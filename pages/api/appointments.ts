// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getById } from "../../lib/prisma/users";
import { getTreatmentById } from "../../lib/prisma/treatment";
import validateAppointment from "../../lib/validation/appointmentValidation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

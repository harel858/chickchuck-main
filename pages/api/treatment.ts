// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createTreatment,
  deleteById,
  getTreatments,
} from "../../lib/prisma/treatment";
import { getById } from "../../lib/prisma/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const { title, cost, duration, businessId } = req.body;

      const { userExist, err } = await getById(businessId);
      if (err || !userExist) return res.status(500).json(`user not found`);
      const { newTreatment, insertionErr } = await createTreatment({
        title,
        cost,
        duration,
        businessId,
      });
      if (insertionErr || !newTreatment)
        return res.status(500).json(`something went wrong`);

      console.log(newTreatment);

      return res.status(200).json(newTreatment);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  if (req.method == "DELETE") {
    const { id } = req.body;
    if (!id) return res.status(500).json("no id ");
    const { deleteSuccess, err } = await deleteById(id);
    if (!deleteSuccess || err)
      return res.status(500).json(`something went wrong`);
    return res.status(200).json(deleteSuccess);
  }
  if (req.method == "GET") {
    try {
      const { id } = req.query;
      if (!id) return res.status(500).json(`no id`);

      const { userExist, err } = await getById(id);

      if (err || !userExist) {
        console.log(err);
        return res.status(500).json(err);
      }
      const { treatments, treatmentNotFound } = await getTreatments(
        userExist.id
      );
      if (treatmentNotFound || !treatments)
        return res.status(500).json(`not find any treatments`);

      return res.status(200).json(treatments);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

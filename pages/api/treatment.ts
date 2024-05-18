// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { bussinessById } from "@lib/prisma/bussiness/getUnique";
import validateService from "@lib/validation/serviceValidation";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createTreatment,
  deleteById,
  getTreatments,
} from "../../lib/prisma/treatment";
import { getUserAccount } from "../../lib/prisma/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const {
        title,
        cost,
        duration,
        documentName,
        advancePayment,
        businessId,
      } = req.body;

      //validate Service
      const { error } = validateService({
        title,
        cost,
        duration,
        advancePayment,
        documentName,
        businessId,
      });
      if (error) {
        const err = error.details[0]?.message;
        console.log({ err });
        return res.status(400).json(err);
      }

      const business = await bussinessById(businessId);
      if (!business?.id || business?.user)
        return res.status(500).json(`business not found`);

      const newTreatment = await createTreatment({
        title,
        cost: +cost,
        duration: +duration,
        documentName,
        advancePayment: +advancePayment,
        business,
      });

      if (!newTreatment) return res.status(500).json(`something went wrong`);

      return res.status(201).json(newTreatment);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  if (req.method == "DELETE") {
    const { id } = req.query;

    if (!id || Array.isArray(id)) return res.status(500).json("no id");
    const { deleteSuccess, err } = await deleteById(id);
    if (!deleteSuccess || err)
      return res.status(500).json(`something went wrong`);
    return res.status(200).json(deleteSuccess);
  }
  if (req.method == "GET") {
    try {
      const id = req.query.id as string;
      if (!id) return res.status(500).json(`no id`);

      const userExist = await getUserAccount(id);

      if (!userExist) {
        return res.status(500).json("getUserAccount function failed");
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

import {
  createBussinessAddress,
  getBusinessAddress,
  updateBussinessAddress,
} from "@lib/prisma/bussiness/addresses";
import validateAddress from "@lib/validation/adressValidation";
import { NextApiRequest, NextApiResponse } from "next";
import { BusinessAddress } from "../../../types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { city, street, userId, zipcode, businessId } =
      req.body as BusinessAddress;
    if (!city || !street || !userId || !businessId) {
      return res.status(400).json("Missing Inputs");
    }
    try {
      const { error } = validateAddress({
        city,
        street,
        userId,
        zipcode,
        businessId,
      });
      if (error)
        return res.status(400).json({ error: error.details[0]?.message });
      const addresses = await getBusinessAddress(businessId);
      if (!addresses || !addresses[0]?.id || addresses.length <= 0) {
        const newAddress = await createBussinessAddress({
          businessId,
          city,
          street,
          userId,
          zipcode,
        });
        if (!newAddress) return res.status(500).json("create address failed");
        return res.status(200).json("create address success");
      }
      const updateAdress = await updateBussinessAddress(
        addresses[0].id,
        city,
        street,
        zipcode
      );
      if (!updateAdress) return res.status(500).json("update address failed");
      return res.status(200).json("update address success");
    } catch (err) {
      console.log(err);
      return res.status(500).json("request Falid");
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

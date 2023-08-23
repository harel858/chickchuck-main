// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { createCustomer, getCustomer } from "@lib/prisma/customer/customer";
import validateCustomer from "@lib/validation/customer";
import {
  blockCustomerForBusiness,
  isCustomerBlockedForBusiness,
  unblockCustomerForBusiness,
} from "@lib/prisma/customer/blocks";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const { customerId, businessId } = req.body;
      if (!customerId || !businessId)
        return res.status(500).json("Missing Data");
      const isBlock = await isCustomerBlockedForBusiness(
        customerId,
        businessId
      );
      if (isBlock) {
        const { success, error } = await unblockCustomerForBusiness(
          customerId,
          businessId
        );
        if (success) return res.status(200).json(false);
        return res.status(200).json(error);
      }
      const { success, error } = await blockCustomerForBusiness(
        customerId,
        businessId
      );
      if (success) return res.status(200).json(true);
      return res.status(200).json(error);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

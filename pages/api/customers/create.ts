// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { createCustomer, getCustomer } from "@lib/prisma/customer";
import validateCustomer from "@lib/validation/customer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const { phoneNumber, name } = req.body;

      const { error } = validateCustomer(req.body);
      if (error) return res.status(400).json(error?.details[0]?.message);

      const { customer, getCustomerErr } = await getCustomer(phoneNumber);

      if (getCustomerErr) return res.status(500).json(getCustomerErr);

      if (customer)
        return res
          .status(409)
          .json(`User with this phone number is already existed`);

      const { newCustomer, createCustomerErr } = await createCustomer(
        name,
        phoneNumber
      );

      if (!newCustomer || createCustomerErr)
        return res.status(500).json(`faild to create new customer`);

      return res.status(200).json(newCustomer);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

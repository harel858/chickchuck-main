// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { createCustomer, getCustomer } from "@lib/prisma/customer/customer";
import validateCustomer from "@lib/validation/customer";
import { bussinessById } from "@lib/prisma/bussiness/getUnique";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const { phoneNumber, name, bussinesId } = req.body;

      const { error } = validateCustomer(req.body);
      if (error) return res.status(400).json(error?.details[0]?.message);

      const business = await bussinessById(bussinesId);

      if (!business)
        return res.status(500).json("error with finding the business");

      const matchingCustomer = business.Customer?.find(
        (customer) => customer.phoneNumber === phoneNumber
      );

      if (matchingCustomer)
        return res
          .status(409)
          .json(`User with this phone number is already existed`);

      const { newCustomer, createCustomerErr } = await createCustomer(
        name,
        phoneNumber,
        bussinesId
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

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Vonage } from "@vonage/server-sdk";
import {
  createCustomer,
  getCustomer,
  updateCustomer,
} from "../../../lib/prisma/customer";
import { VerificationData } from "../../../types/types";

const vonage = new (Vonage as any)({
  apiKey: `${process.env.API_KEY}`,
  apiSecret: `${process.env.API_SECRET}`,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const { request_id, code, phoneNumber, name, bussinesId } =
        req.body as VerificationData;

      const { customer, getCustomerErr } = await getCustomer(
        phoneNumber,
        bussinesId
      );

      if (getCustomerErr) return res.status(500).json(getCustomerErr);

      if (customer && customer.name !== name)
        await updateCustomer(name, phoneNumber);

      if (customer) return res.status(200).json(customer);

      const { newCustomer, createCustomerErr } = await createCustomer(
        name,
        phoneNumber,
        bussinesId
      );
      if (!newCustomer || createCustomerErr) {
        return res.status(500).json(`faild`);
      }
      return res.status(200).json(newCustomer);

      /*  const check = await vonage.verify.check(request_id, code);
      console.log(`check: ${JSON.stringify(check)}`);
      console.log(check);

      if (check.status == 0) {
        const cancel = await vonage.verify.cancel(request_id);
        console.log(`cancel: ${JSON.stringify(cancel)}`);

        if(customer) return res.status(200).json(customer)

        const { newCustomer, createCustomerErr } = await createCustomer(
          name,
          phoneNumber
        );
        if (!newCustomer || createCustomerErr) {
          return res.status(500).json(`faild`);
        }
        return res.status(200).json(newCustomer);
      }
      return res.status(400).json(`wrong number`); */
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

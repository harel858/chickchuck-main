import { NextApiRequest, NextApiResponse } from "next";
import { Vonage } from "@vonage/server-sdk";
import {
  createCustomer,
  getCustomer,
  updateCustomer,
} from "../../../lib/prisma/customer/customer";
import { VerificationData } from "../../../types/types";
import { Customer } from "@prisma/client";

const vonage = new (Vonage as any)({
  apiKey: `${process.env.API_KEY}`,
  apiSecret: `${process.env.API_SECRET}`,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { request_id, code, phoneNumber, name, bussinesId } =
      req.body as VerificationData;

    const check = await vonage.verify.check(request_id, code);

    if (+check.status !== 0) {
      return res.status(400).json("Wrong verification code");
    }

    let customer: Customer | null = null;
    const { existCustomer, getCustomerErr } = await getCustomer(
      phoneNumber,
      bussinesId
    );

    if (existCustomer) {
      customer = existCustomer;
      if (existCustomer.name !== name) {
        await updateCustomer(name, phoneNumber);
        customer = existCustomer;
      }
    } else {
      const { newCustomer, createCustomerErr } = await createCustomer(
        name,
        phoneNumber,
        bussinesId
      );
      customer = newCustomer || null;
    }

    await vonage.verify.cancel(request_id);

    if (customer) {
      return res.status(200).json(customer);
    } else {
      return res.status(500).json("Internal Server Error");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal Server Error");
  }
}

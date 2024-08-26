// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { VerificationData } from "../../../types/types";
import { Customer } from "@prisma/client";
import {
  createCustomer,
  getCustomer,
  updateCustomer,
} from "@lib/prisma/customer/customer";

const SMS_ENDPOINT = "https://019sms.co.il/api";
const SMS_APP_ID = "1000";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ error: `Method ${req.method} is not allowed.` });
  }

  try {
    const { name, phoneNumber, code, request_id, bussinesId } =
      req.body as VerificationData;
    if (!phoneNumber || !name) {
      return res
        .status(400)
        .json({ error: "Missing values: name and phoneNumber are required." });
    }

    const accessToken = process.env.SMS_TOKEN;
    if (!accessToken) {
      return res
        .status(500)
        .json({ error: "Server configuration error: SMS token is missing." });
    }

    const body = {
      validate_otp: {
        user: {
          username: "harellevi",
        },
        phone: phoneNumber,
        app_id: SMS_APP_ID,
        code: code,
        destination_type: "1",
      },
    };

    const { data: result } = await axios.post(SMS_ENDPOINT, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (+result.status !== 0) {
      return res.status(400).json(result);
    }

    const { existCustomer } = await getCustomer(phoneNumber, bussinesId);

    let customer: Customer | null = null;
    if (existCustomer) {
      customer = existCustomer;
      if (existCustomer.name !== name) {
        await updateCustomer(name, phoneNumber);
      }
    } else {
      const { newCustomer } = await createCustomer(
        name,
        phoneNumber,
        bussinesId
      );
      customer = newCustomer || null;
    }

    if (customer) {
      return res.status(200).json(customer);
    } else {
      return res.status(500).json({ error: "Customer creation failed." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
}

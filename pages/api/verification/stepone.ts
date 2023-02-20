// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Vonage } from "@vonage/server-sdk";

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
      const { name, phoneNumber } = req.body;
      if (!phoneNumber && !name) return res.status(400).json(`missing values`);
      console.log(phoneNumber);

      const sendSms = await vonage.verify.start({
        number: phoneNumber,
        brand: "Vonage",
      });
      console.log(sendSms);

      if (sendSms.status === `0`)
        return res.status(200).send(sendSms.request_id);

      return res.status(500).json(`something went wrong`);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

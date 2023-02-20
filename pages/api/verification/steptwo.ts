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
      const { request_id, code } = req.body;
      console.log(req.body);

      const check = await vonage.verify.check(request_id, code);
      console.log(`check: ${JSON.stringify(check)}`);
      console.log(check);

      if (check.status == 0) {
        const cancel = await vonage.verify.cancel(request_id);
        console.log(`cancel: ${JSON.stringify(cancel)}`);
        return res.status(200).json(`success`);
      }
      return res.status(400).json(`wrong number`);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

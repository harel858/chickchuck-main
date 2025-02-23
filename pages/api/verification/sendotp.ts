// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { VerificationData } from "../../../types/types";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const { name, phoneNumber, code, request_id } =
        req.body as VerificationData;
      if (!phoneNumber && !name) return res.status(400).json(`missing values`);

      const endPoint = "https://019sms.co.il/api";
      // get yours access token from https://docs.019sms.co.il/guide/
      const accessToken = process.env.SMS_TOKEN;

      const body = {
        send_otp: {
          user: {
            username: "harellevi",
          },
          phone: "1" + phoneNumber,
          app_id: "1000",
          source: "0537761400",
          includes_international: "1",
          max_tries: "4",
          text: "the code is [code]",
        },
      };
      const ans = await axios.post(endPoint, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = ans.data;
      console.log("result", result);
      // check the errors in https://docs.019sms.co.il/sms/errors-and-status.html
      if (result.status == 0) {
        return res.status(200).json(result);
      } else {
        console.log("result", result);
        return res.status(500).json(`something went wrong`);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

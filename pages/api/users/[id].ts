// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getById } from "../../../lib/prisma/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    try {
      const id = req.query.id as string;

      if (!id) return res.status(500).json("server Error");
      const { userExist, err } = await getById(id);
      if (err || !userExist) return res.status(500).json("not found");

      return res.status(200).json(userExist);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

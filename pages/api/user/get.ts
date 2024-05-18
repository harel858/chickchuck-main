// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getById, signIn } from "../../../lib/prisma/users";
import bcrypt from "bcrypt";
import validateUser from "../../../lib/validation/userValidation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET" && req.query.email && req.query.password) {
    try {
      const email = req.query.email as string;
      const password = req.query.password as string;

      if (!email || !password) return res.status(500).json("server Error");
      const { user, error } = await signIn(email, password);
      if (error || !user) return res.status(500).json("not found");

      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  if (req.method == "GET" && req.query.id) {
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

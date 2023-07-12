// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createEmployee } from "@lib/prisma/team/create";
import validateUser from "@lib/validation/userValidation";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@lib/prisma/users";

interface Body {
  name: string;
  email: string;
  password: string;
  businessName: string;
  businessId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const { name, email, password, businessName } = req.body as Body;

      //validate user
      const { error } = validateUser({
        name,
        email,
        password,
        businessName,
      });
      if (error) {
        const err = error.details[0].message;
        console.log({ err });
        return res.status(400).json({ err });
      }

      //hash password
      if (!password) {
        return res.status(400).json(`password is required`);
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      //check if user exist
      const userExist = await getUserByEmail(email);
      if (userExist) return res.status(400).json(`user already exist`);

      const { employee, err } = await createEmployee({
        ...req.body,
        password: hashedPassword,
      });
      if (!employee || err)
        return res.status(400).json({ err: "createEmployee function failed" });
      return res.status(200).json(employee);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

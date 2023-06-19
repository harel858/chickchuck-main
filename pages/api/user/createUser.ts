// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createUser, getByEmail } from "@lib/prisma/users";
import bcrypt from "bcrypt";
import validateUser from "@lib/validation/userValidation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const { name, email, password, businessName } = req.body;

      //validate user
      const { error, value } = validateUser({
        name,
        email,
        password,
        businessName,
      });
      if (error) {
        const err = error.details[0].message;
        console.log({ err });
        return res.status(400).send(err);
      }
      console.log(value);

      //hash password
      if (!password) {
        return res.status(400).send(`password is required`);
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      //check if user exist
      const { userExist } = await getByEmail(email);
      console.log(`userExist: ${userExist}`);

      if (userExist) return res.status(400).send(`user already exist`);

      //create the user
      const { newUser, err } = await createUser({
        name,
        email,
        password: hashedPassword,
        businessName,
      });

      if (err) return res.status(500).send(err);

      return res.status(201).send(newUser);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

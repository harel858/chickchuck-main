import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import validateUser from "@lib/validation/userValidation";
import { CreateUser } from "types/types";

async function signUp(
  req: NextApiRequest,
  res: NextApiResponse,
  database: {
    createUser: ({
      name,
      email,
      phone,
      password,
      businessName,
    }: CreateUser) => Promise<string | null>;
    getIdByEmail(email: string): Promise<string | null | undefined>;
  }
) {
  if (req.method == "POST") {
    try {
      const { name, email, phone, password, businessName } = req.body;

      //validate user
      const { error } = validateUser({
        name,
        email,
        phone,
        password,
        businessName,
      });
      if (error) {
        const err = error.details[0]?.message;
        console.log({ err });
        return res.status(400).json(err);
      }

      //hash password
      if (!password) {
        return res.status(400).json(`password is required`);
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      //check if user exist
      const userId = await database.getIdByEmail(email);

      if (userId) return res.status(400).json(`user already exist`);

      //create the user
      const newUserId = await database.createUser({
        name,
        email,
        phone,
        password: hashedPassword,
        businessName,
      });

      if (!newUserId) return res.status(500).json("user faild creation");

      return res.status(201).json({ name, email });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

export default signUp;

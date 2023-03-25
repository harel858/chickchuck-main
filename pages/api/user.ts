// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createUser,
  getAllUsers,
  getByEmail,
  getByBusinessName,
  getById,
  signIn,
} from "../../lib/prisma/users";
import bcrypt from "bcrypt";
import validateUser from "../../lib/validation/userValidation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    try {
      const { users } = await getAllUsers();

      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
  if (req.method == "POST") {
    try {
      const { name, email, password, businessName } = req.body;

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
        return res.status(400).json(err);
      }

      //hash password
      if (!password) {
        return res.status(400).json(`password is required`);
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      //check if user exist
      const { userExist } = await getByEmail(email);
      console.log(userExist);

      if (userExist) return res.status(400).json(`user already exist`);

      //create the user
      const { newUser, err } = await createUser({
        name,
        email,
        password: hashedPassword,
        businessName,
      });

      if (err) return res.status(500).json(err);

      return res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
  if (req.method == "GET" && req.query.businessName) {
    try {
      const { businessName } = req.query;
      console.log(businessName);

      if (!businessName) return res.status(500).json("server Error");
      const { userExist, err } = await getByBusinessName(businessName);
      if (err || !userExist) return res.status(500).json("not found");

      return res.status(200).json(userExist);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  if (req.method == "GET" && req.query.email && req.query.password) {
    try {
      const { email, password } = req.query;
      console.log(email);

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
      const { id } = req.query;

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

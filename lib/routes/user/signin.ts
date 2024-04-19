import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { getUserByPhone } from "@lib/prisma/users";

export async function signIn(
  req: NextApiRequest,
  res: NextApiResponse,
  database: {
    getUserByEmail(email: string): Promise<User | null>;
  }
) {
  if (req.method == "POST") {
    try {
      const { email } = req.body;
      //validate user
      if (!email || !req.body.password)
        return res.status(400).json(`Missing Inputs.`);

      const userExist = await database.getUserByEmail(email);

      if (!userExist) return res.status(400).json(`User not found`);

      /* let verify = await bcrypt.compare(req.body.password, userExist.password);

      if (!verify) return res.status(400).json(`User not found`);
 */
      //create the user
      const { password, ...rest } = userExist;
      return res.status(200).json(rest);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`method ${req.method} is not allowed.`);
}

export async function signInNew(emailORphoneNumber: string, password: string) {
  if (!emailORphoneNumber || !password) return { err: `Missing Inputs.` };
  try {
    // Validate user
    const userExist = await getUserByPhone(emailORphoneNumber);

    if (!userExist) return { err: `User not found` };

    /*     const verify = await bcrypt.compare(password, userExist.password);

    if (!verify) return { err: `User not found` }; */

    // Create the user object without the password
    const { password: userPassword, ...rest } = userExist;
    return { user: rest };
  } catch (err) {
    console.log(err);
    return { err: "Internal server error" };
  }
}

/* // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { createUser, getIdByEmail } from "@lib/prisma/users";
import signUp from "@lib/routes/user/signup";
const userOperations = { createUser, getIdByEmail };

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  signUp(req, res, userOperations);

export default handler;
 */
export {};

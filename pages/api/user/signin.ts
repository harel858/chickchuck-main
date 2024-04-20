// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { getUserByPhone } from "@lib/prisma/users";
import { signIn } from "@lib/routes/user/signin";
const userOperations = { getUserByPhone };

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  signIn(req, res, userOperations);

export default handler;

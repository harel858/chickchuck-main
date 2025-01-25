import { NextApiRequest, NextApiResponse } from "next";
import cookies from "next-cookies";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Access cookies
    const allCookies = cookies({ req });
    console.log("Cookies in API route:", allCookies);

    // Return cookies in the response
    res.status(200).json({ cookies: allCookies });
  } catch (error) {
    throw new Error(`Error in get-cookies API route: ${error}`);
  }
}

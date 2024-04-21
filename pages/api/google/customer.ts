import { setupGoogleCalendarClient } from "@lib/google/client";
import { getEventsByCustomer } from "@lib/google/getEventsByCustomer";
import type { NextApiRequest, NextApiResponse } from "next";
type ResponseData = {
  message: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const id = req.query.id as string;
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      // Handle the case when Authorization header is missing
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [bearer, token] = authorizationHeader.split(" ");

    if (bearer?.toLowerCase() !== "bearer" || !token) {
      // Handle the case when the Authorization header is not in the expected format
      return res.status(401).json({ message: "Unauthorized" });
    }
    const googleClient = setupGoogleCalendarClient(token);
    const events = await getEventsByCustomer(googleClient, id);
    if (events)
      return res.status(200).json({ message: JSON.stringify(events) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "internal error" });
  }
}

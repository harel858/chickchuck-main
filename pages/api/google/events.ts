import type { NextApiRequest, NextApiResponse } from "next";
import { setupGoogleCalendarClient } from "@lib/google/client";
import { fetchEvents } from "@lib/google/eventList";
type ResponseData = {
  message: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const accountId = (req.query.id as string) || "";
    const calendarsIds = req.query.calendarsIds
      ? (JSON.parse(req.query.calendarsIds as string) as string[])
      : [];
    const authorizationHeader = req.headers.authorization;
    // Check if the header exists
    if (!authorizationHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing Authorization header" });
    }
    // Split the header value to get the token
    const [bearer, accessToken] = authorizationHeader.split(" ");
    // Check if the header has the correct format
    if (bearer !== "Bearer" || !accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid Authorization header format" });
    }
    const googleClient = setupGoogleCalendarClient(accessToken);
    const scheduleProps = await fetchEvents(
      googleClient,
      accountId,
      calendarsIds
    );

    if (!scheduleProps)
      return res.status(500).json({ message: "fetch Events failed" });

    return res.status(200).json({ message: JSON.stringify(scheduleProps) });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal error" });
  }
}

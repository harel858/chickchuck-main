import type { NextApiRequest, NextApiResponse } from "next";
import { setupGoogleCalendarClient } from "@lib/google/client";
type ResponseData = {
  message: string;
};
const tableName = process.env.DynamoTableName!;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    console.log("header", req.headers);

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

    // Now 'token' contains the extracted Bearer token
    console.log("Bearer Token:", token);

    if (req.body.value) {
      const data = req.body.value.customField;
      console.log("data", data);

      const event = {
        summary: data.Subject,
        description: data.description,
        start: {
          dateTime: data.StartTime, // Date.toISOString() ->
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
        },
        end: {
          dateTime: data.EndTime, // Date.toISOString() ->
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
        },
        extendedProperties: {
          private: {
            treatmentId: data.Service.value,
          },
        },
      };
      const googleClient = setupGoogleCalendarClient(bearer);

      const { auth, calendar, calendarId } = googleClient;
      return res.status(200).json({ message: req.body.value });
    }

    if (req.body.changed !== null && req.body.changed.length > 0) {
    }

    if (req.body.deleted !== null && req.body.deleted.length > 0) {
    }

    return res.status(200).json({ message: req.body });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal error" });
  }
}

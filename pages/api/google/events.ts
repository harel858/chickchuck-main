import { getDataByUserId, updateItemData } from "@lib/aws/Dynamo";
import send from "@lib/aws/webSocketMessage";
import { prisma } from "@lib/prisma";
import { getUserAccount } from "@lib/prisma/users";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Auth, google } from "googleapis";
import { setupGoogleCalendarClient } from "@lib/google/client";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { fetchEvents } from "@lib/google/eventList";
const calendar = google.calendar("v3");
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

    const accountId = (req.query.id as string) || "";
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
    const scheduleProps = await fetchEvents(googleClient, accountId);

    if (!scheduleProps)
      return res.status(500).json({ message: "fetch Events failed" });

    return res
      .status(200)
      .json({ message: JSON.stringify(scheduleProps.data.items) });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal error" });
  }
}

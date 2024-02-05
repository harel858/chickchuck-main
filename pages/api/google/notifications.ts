import { getDataByUserId, updateItemData } from "@lib/aws/Dynamo";
import send from "@lib/aws/webSocketMessage";
import { prisma } from "@lib/prisma";
import { getUserAccount } from "@lib/prisma/users";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Auth, google } from "googleapis";
import { setupGoogleCalendarClient } from "@lib/google/client";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
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
    const userId = req.query.userId as string;
    const record = await getDataByUserId(userId, tableName);
    const user = await getUserAccount(userId);
    const access_token = user?.accounts[0]?.access_token;
    const syncToken = user?.accounts[0]?.syncToken || "";
    if (!access_token) throw new Error("access_token is missing");

    const calendarId = "primary";
    const { auth, calendar } = setupGoogleCalendarClient(access_token);

    const response = await calendar.events.list({
      calendarId,
      syncToken,
      auth,
    });
    const events = response.data;
    if (events.items && events?.items.length === 0)
      throw new Error("empty list");

    const newSyncToken = events.nextSyncToken;

    await prisma.account.update({
      where: { id: user?.accounts[0]?.id },
      data: {
        syncToken: newSyncToken,
      },
    });

    const newMessages = events;

    const data = {
      ...record,
      messages: [newMessages],
    };

    if (record?.connectionId !== "false") {
      const result = await send({
        connectionID: record?.connectionId,
        ...data,
      });
      console.log("sendResult", result);
    }
    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal error" });
  }
}

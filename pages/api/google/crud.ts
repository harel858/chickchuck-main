import type { NextApiRequest, NextApiResponse } from "next";
import { setupGoogleCalendarClient } from "@lib/google/client";
import { updateGoogleCalendarEvent } from "@lib/google/updateEvent";
import { EventProps } from "actions/createAppointment";
import { deleteAppointment } from "actions/deleteAppointment";
import { deleteGoogleCalendarEvent } from "@lib/google/deleteEvent";
type ResponseData = {
  message: string;
};
export type DeleteBody = {
  EndTime: string;
  ExtendedProperties: {
    private: {
      customerId: string;
      treatmentId: string;
      customerName: string;
      conferenceId: string;
    };
  };
  Guid: string;
  Id: string;
  IsAllDay: boolean;
  StartTime: string;
  Subject: string;
  descripition: string;
  status: string;
};

const tableName = process.env.DynamoTableName!;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
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

    if (req.body.value) {
      const data = req.body.value.customField;

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
      const data = req.body.changed[0] as EventProps & {
        id: string;
      };
      const googleClient = setupGoogleCalendarClient(bearer);
      const updateEvent = await updateGoogleCalendarEvent(
        googleClient,
        req.body
      );
      return res
        .status(200)
        .json({ message: JSON.stringify({ reqBody: req.body, updateEvent }) });
    }

    if (req.body.deleted !== null && req.body.deleted.length > 0) {
      console.log("req.body.deleted", req.body.deleted);

      const data = req.body.deleted[0] as DeleteBody;

      const calendarId = data.ExtendedProperties.private.conferenceId;
      const googleClient = setupGoogleCalendarClient(token);
      const deletedEvent = await deleteGoogleCalendarEvent(
        { ...googleClient, calendarId: calendarId },
        data.Id
      );
      return res
        .status(200)
        .json({ message: JSON.stringify({ reqBody: deletedEvent }) });
    }

    return res.status(200).json({ message: req.body });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal error" });
  }
}

import { AppointmentRequest } from "@prisma/client";
import { calendar_v3 } from "googleapis";
import { CombinedEvent } from "types/types";

// Type guard to check if the event is a Google Calendar event
export function isGoogleEvent(
  event: CombinedEvent
): event is calendar_v3.Schema$Event {
  return (event as calendar_v3.Schema$Event).extendedProperties !== undefined;
}

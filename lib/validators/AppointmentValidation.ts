import { z } from "zod";
import { Treatment } from "@prisma/client";

export const appointmentValidation = z.object({
  Service: z.object({ value: z.string(), label: z.string() }),
  Client: z.object({ value: z.string(), label: z.string() }),
  Date: z.string(),
  slot: z.object({ start: z.string(), end: z.string() }),
});

export type TAppointmentValidation = z.infer<typeof appointmentValidation>;

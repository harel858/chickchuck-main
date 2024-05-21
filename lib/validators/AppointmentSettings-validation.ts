import { z } from "zod";

export const appointmentSettingsValidation = z.object({
  confirmationNeeded: z.boolean(),
});

export type TAppointmentSettingsValidation = z.infer<
  typeof appointmentSettingsValidation
>;

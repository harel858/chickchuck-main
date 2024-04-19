import { z } from "zod";

export const MemberValidation = z.object({
  name: z.string().min(2, {
    message: "Business Name must be at least 2 characters long.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters long.",
  }),
  calendarHide: z.boolean(),
  pageHide: z.boolean(),
  authorization: z.enum(["NONE", "CALENDAR", "ADMIN"]),
});

export type TMemberValidation = z.infer<typeof MemberValidation>;

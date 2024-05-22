import { z } from "zod";

export const BusinessDetailsValidation = z.object({
  businessName: z.string().min(2, {
    message: "Business Name must be at least 2 characters long.",
  }),
  businessPhone: z.string().min(10, {
    message: "Phone number must be at least 10 characters long.",
  }),
  businessAddress: z.string().min(2, {
    message: "Phone number must be at least 2 characters long.",
  }),
  confirmationNeeded: z.boolean().nullable(),
});

export type TBusinessDetailsValidation = z.infer<
  typeof BusinessDetailsValidation
>;

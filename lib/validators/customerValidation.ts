import { z } from "zod";

export const customerDetailsValidation = z.object({
  Name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  Phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters long.",
  }),
});

export type TCustomerDetailsValidation = z.infer<
  typeof customerDetailsValidation
>;

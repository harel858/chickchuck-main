import { z } from "zod";

export const TreatmentValidation = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters long.",
  }),
  price: z.number(),

  duration: z.number(),
});

export type TreatmentType = z.infer<typeof TreatmentValidation>;
/*  advancePayment: z.number(),
  documentNeeded: z.object({
    id: z.string(),
    name: z.string(),
    businessId: z.string(),
  }), */

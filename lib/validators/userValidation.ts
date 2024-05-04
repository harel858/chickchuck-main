import { z } from "zod";

export const UserValidation = z.object({
  fullName: z.string().min(2, {
    message: "שם חייב להיות יותר מ2 אותיות",
  }),
  phoneNumber: z.string().max(14, {
    message: "מספר פלאפון חייב להיות פחות מ14 ספרות",
  }),
});

export type TUserValidation = z.infer<typeof UserValidation>;

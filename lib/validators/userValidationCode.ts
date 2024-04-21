import { z } from "zod";

export const UserValidationCode = z.object({
  code: z.string().max(10, {
    message: "הקוד חייב להיות לא יותר מ10 ספרות.",
  }),
});

export type TUserValidationCode = z.infer<typeof UserValidationCode>;

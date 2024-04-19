import { z } from "zod";

export const MemberSignin = z.object({
  phone: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export type TMemberSignin = z.infer<typeof MemberSignin>;

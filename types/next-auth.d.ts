/* eslint-disable no-unused-vars */
import { Business, Images, User } from "@prisma/client";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    user: User;
    access_token: string;
    urls: Images;
    business: Business | null;
    trigger: "signIn" | "update" | "signUp" | undefined;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      access_token: string;
      urls: Images;
      business: Business | null;
    };
  }
}

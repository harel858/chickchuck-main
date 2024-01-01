/* eslint-disable no-unused-vars */
import {
  Business,
  Treatment,
  User,
  Customer,
  ActivityDays,
} from "@prisma/client";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    refresh_token: string;
    exp: number;
    user: User;
    activityDays: ActivityDays[];
    accessTokenExpires: numer;
    access_token: string;
    logo: string | null;
    treatments: Treatment[];
    Customer: Customer[];
    business: Business | null;
    trigger: "signIn" | "update" | "signUp" | undefined;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      activityDays: ActivityDays[];
      Customer: Customer[];
      treatments: Treatment[];
      access_token: string;
      logo: string | null;
      business: Business | null;
    };
  }
}

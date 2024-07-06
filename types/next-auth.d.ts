import { AppointmentRequest } from "@prisma/client";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    refresh_token: string;
    exp: number;
    user: User;
    isAdmin: boolean;
    /*     activityDays: ActivityDays[];
     */ accessTokenExpires: number;
    account: Account | null;
    access_token: string;
    businessId: string;
    logo: string | null;
    treatments: Treatment[];
    accountId: string;
    Customer: Customer[];
    business: Business | null;
    trigger: "signIn" | "update" | "signUp" | undefined;
  }
}

declare module "next-auth" {
  interface Session {
    user:
      | (User & {
          id: UserId;
          access_token: string;
          publicKeys: any;
          isAdmin: boolean;
          businessId: string;
          accountId: string;
          businessName: string;
        })
      | (Customer & {
          isAdmin: boolean;
        });
  }
}

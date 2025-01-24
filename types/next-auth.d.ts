import {
  Account,
  ActivityDays,
  AppointmentRequest,
  Business,
  Customer,
  Treatment,
  User,
  UserRole,
} from "@prisma/client";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
type UserId = string;

declare module "next-auth" {
  interface User extends PrismaUser {
    isNewUser?: boolean; // Add the isNewUser property
    preferredLocale?: strings;
    UserRole?: UserRole | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    refresh_token: string;
    exp: number;
    createdAt: string | null;
    user:
      | User
      | (Customer & {
          isAdmin?: boolean;
        });
    accessTokenExpires: number;
    account: Account | null;
    access_token: string;
    businessId: string;
    logo: string | null;
    accountId: string;
    business: Business | null;
    trigger: "signIn" | "update" | "signUp" | undefined;
  }
}

declare module "next-auth" {
  interface Session {
    user:
      | User & {
          id: UserId;
          access_token: string;
          publicKeys: any;
          UserRole?: string; // Add the UserRole property
          isAdmin: boolean;
          businessId: string;
          accountId: string;
          businessName: string;
        };
    /*  | (Customer & {
          isAdmin: boolean;
        }); */
  }
}
